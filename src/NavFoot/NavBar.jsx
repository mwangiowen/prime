import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners"; // React spinner for loading state

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // OAuth Setup
  const app_id = "64522"; // Your application ID from Deriv
  const redirect_uri = "https://prime-jh3u.vercel.app/"; // Your redirect URL after login
  const oauthUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${app_id}&scope=read&redirect_uri=${redirect_uri}`;

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const account = queryParams.get("acct1");
    const token = queryParams.get("token1");

    if (account && token) {
      setIsLoggedIn(true);
      // Connect to WebSocket and fetch user details when user is logged in
      connectWebSocket(token);
    } else {
      setIsLoggedIn(false);
      setLoading(false);
    }
  }, []);

  const connectWebSocket = (token) => {
    const socket = new WebSocket(
      `wss://ws.derivws.com/websockets/v3?app_id=${app_id}`
    );

    socket.onopen = function (e) {
      console.log("[open] Connection established");
      console.log("Sending authorization request");
      const authMessage = JSON.stringify({ authorize: token });
      socket.send(authMessage);
    };

    socket.onmessage = function (event) {
      const response = JSON.parse(event.data);
      console.log("Response from WebSocket:", response); // Log response for debugging

      if (response.error) {
        setError(response.error.message);
        setLoading(false);
      } else if (response.msg_type === "authorize") {
        // Successfully authorized, now subscribe to account details
        const accountInfoMessage = JSON.stringify({
          balance: 1, // Request balance information
          ticks: "R_100", // Example symbol, you can change this as needed
        });
        socket.send(accountInfoMessage);
      } else if (response.msg_type === "balance") {
        setUserData({
          name: "User", // Placeholder; replace with actual user name if available
          balance: response.balance.balance,
          account_id: response.balance.loginid,
          currency: response.balance.currency,
        });
        setLoading(false);
      }
    };

    socket.onclose = function (event) {
      if (event.wasClean) {
        console.log(
          `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
        );
      } else {
        console.log("[close] Connection died");
      }
    };

    socket.onerror = function (error) {
      console.log("[error] WebSocket error", error);
      setError("WebSocket connection failed");
      setLoading(false);
    };
  };

  const handleLogout = () => {
    // Reset the logged-in state and clear user session
    setIsLoggedIn(false);
    setUserData(null);
    window.location.href = redirect_uri; // Redirect to the home page after logout
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left - Brand Name */}
        <Link to="/" className="text-white font-bold text-xl">
          Prime-D
        </Link>

        {/* Right - Conditionally render user details or Sign-In/Signup Links */}
        <div className="space-x-4">
          {isLoggedIn ? (
            loading ? (
              <div className="flex items-center">
                {/* Spinner while loading */}
                <PuffLoader color="#ffffff" size={24} />
                <span className="text-white ml-2">Loading details...</span>
              </div>
            ) : error ? (
              <span className="text-red-500">Error: {error}</span>
            ) : (
              <div className="flex items-center space-x-4 text-white font-semibold">
                {/* Display user details */}
                <div>
                  <span className="block">Name: {userData.name}</span>
                  <span className="block">Balance: ${userData.balance}</span>
                  <span className="block">
                    Account ID: {userData.account_id}
                  </span>
                  <span className="block">Currency: {userData.currency}</span>
                </div>
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-600"
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
  );
};

export default NavBar;
