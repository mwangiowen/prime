import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../auth/AuthContext"; // Import useAuth

const NavBar = () => {
  const { user, login, logout } = useAuth(); // Get user, login, and logout from context
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const app_id = "64522";
  const redirect_uri = "https://prime-jh3u.vercel.app/";
  const oauthUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${app_id}&scope=read&redirect_uri=${redirect_uri}`;

  const connectWebSocket = (token) => {
    const socket = new WebSocket(
      `wss://ws.derivws.com/websockets/v3?app_id=${app_id}`
    );

    socket.onopen = () => {
      console.log("[open] Connection established");
      socket.send(JSON.stringify({ authorize: token }));
    };

    socket.onmessage = (event) => {
      const response = JSON.parse(event.data);
      console.log("Response from WebSocket:", response);

      if (response.error) {
        setError(response.error.message);
        toast.error(`Error: ${response.error.message}`);
        setLoading(false);
      } else if (response.msg_type === "authorize") {
        socket.send(JSON.stringify({ balance: 1 }));
      } else if (response.msg_type === "balance") {
        login({
          balance: response.balance.balance,
          account_id: response.balance.loginid,
          currency: response.balance.currency,
          name: "User's Name", // Default name or fetched name
        });
        setLoading(false);
      }
    };

    socket.onerror = (error) => {
      console.error("[error]", error);
      toast.error("WebSocket connection failed");
      setLoading(false);
    };

    socket.onclose = () => console.log("[close] Connection closed");
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token1");

    if (token) {
      setLoading(true);
      connectWebSocket(token);
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = redirect_uri; // Redirect to homepage after logout
  };

  return (
    <>
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white font-bold text-xl">
            Prime-D
          </Link>
          <div className="space-x-4">
            {user ? (
              loading ? (
                <div className="flex items-center">
                  <PuffLoader color="#ffffff" size={24} />
                  <span className="text-white ml-2">Loading...</span>
                </div>
              ) : (
                <div className="text-white font-semibold">
                  <span className="block">Welcome, {user.name}!</span>
                  <span className="block">Balance: ${user.balance}</span>
                  <span className="block">Account ID: {user.account_id}</span>
                  <span className="block">Currency: {user.currency}</span>
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
      <ToastContainer />
    </>
  );
};

export default NavBar;
