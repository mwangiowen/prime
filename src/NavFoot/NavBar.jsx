import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const app_id = "64522"; // Your application ID
  const redirect_uri = "https://prime-jh3u.vercel.app/"; // Your redirect URL
  const oauthUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${app_id}&scope=read&redirect_uri=${redirect_uri}`;

  const connectWebSocket = (token) => {
    const socket = new WebSocket(
      `wss://ws.derivws.com/websockets/v3?app_id=${app_id}`
    );

    socket.onopen = () => {
      console.log("[open] Connection established");
      const authMessage = JSON.stringify({ authorize: token });
      socket.send(authMessage);
    };

    socket.onmessage = (event) => {
      const response = JSON.parse(event.data);
      console.log("Response from WebSocket:", response);

      if (response.error) {
        setError(response.error.message);
        toast.error(`Error: ${response.error.message}`); // Show error in Toast
        setLoading(false);
      } else if (response.msg_type === "authorize" && response.authorized) {
        console.log("Successfully authorized.");
        // Request user balance
        const balanceMessage = JSON.stringify({
          balance: 1, // Request balance information
        });
        socket.send(balanceMessage);
      } else if (response.msg_type === "balance") {
        // Update user data with balance
        setUserData({
          balance: response.balance.balance,
          account_id: response.balance.loginid,
          currency: response.balance.currency,
          name: "User's Name", // Add the user's name here (you can fetch this from your API if available)
        });
        setIsLoggedIn(true);
        setLoading(false);
      }
    };

    socket.onerror = (error) => {
      console.error("[error]", error);
      toast.error("WebSocket connection failed"); // Show error in Toast
      setLoading(false);
    };

    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log(
          `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
        );
      } else {
        console.log("[close] Connection died");
      }
    };
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token1");

    if (token) {
      connectWebSocket(token);
    } else {
      setLoading(false); // No token, end loading
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setError(null);
    window.location.href = redirect_uri; // Redirect to the home page
  };

  return (
    <>
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white font-bold text-xl">
            Prime-D
          </Link>
          <div className="space-x-4">
            {isLoggedIn ? (
              loading ? (
                <div className="flex items-center">
                  <PuffLoader color="#ffffff" size={24} />
                  <span className="text-white ml-2">Loading...</span>
                </div>
              ) : (
                <div className="text-white font-semibold">
                  <span className="block">Welcome, {userData.name}!</span>
                  <span className="block">Balance: ${userData.balance}</span>
                  <span className="block">
                    Account ID: {userData.account_id}
                  </span>
                  <span className="block">Currency: {userData.currency}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white font-semibold py-1 px-4 rounded-full hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              )
            ) : (
              <a
                href={oauthUrl}
                className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-full hover:bg-blue-100"
              >
                Sign-In/Signup
              </a>
            )}
          </div>
        </div>
      </nav>
      <ToastContainer /> {/* Add ToastContainer for notifications */}
    </>
  );
};

export default NavBar;
