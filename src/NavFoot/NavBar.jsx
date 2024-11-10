import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../auth/AuthContext";
import logoImage from "../assets/logo.jpg";
import telegramIcon from "../assets/telegramicon.png";

const NavBar = () => {
  const { user, login, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [balances, setBalances] = useState({
    demo: null,
    real: null,
  });
  const [selectedAccount, setSelectedAccount] = useState("demo");
  const websocketRef = useRef(null);

  const app_id = "64522";
  const redirect_uri = "https://prime-jh3u.vercel.app/";
  const oauthUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${app_id}&scope=read&redirect_uri=${redirect_uri}`;

  // Token validation function
  const validateToken = (token) => {
    const tokenRegex = /^[\w\-]{1,128}$/;
    return tokenRegex.test(token);
  };

  const connectWebSocket = (token) => {
    websocketRef.current = new WebSocket(
      `wss://ws.derivws.com/websockets/v3?app_id=${app_id}`
    );

    websocketRef.current.onopen = () => {
      console.log("[open] Connection established");

      if (token) {
        // Send the authorization request with the token
        websocketRef.current.send(JSON.stringify({ authorize: token }));
      } else {
        console.log("No token provided.");
        toast.error("Authorization token is missing.");
        setLoading(false);
      }
    };

    websocketRef.current.onmessage = (event) => {
      const response = JSON.parse(event.data);
      console.log("Response from WebSocket:", response);

      if (response.error) {
        setError(response.error.message);
        toast.error(`Error: ${response.error.message}`);
        setLoading(false);
      } else if (response.msg_type === "authorize") {
        // Store user profile data if authorization is successful
        setUserProfile(response.authorize);

        // Request balance information for the selected account type
        websocketRef.current.send(
          JSON.stringify({ balance: 1, account: selectedAccount })
        );
      } else if (response.msg_type === "balance") {
        const accountType = response.balance.account_type;
        setBalances((prevBalances) => ({
          ...prevBalances,
          [accountType]: {
            balance: response.balance.balance,
            account_id: response.balance.loginid,
            currency: response.balance.currency,
          },
        }));
        setLoading(false);
      }
    };

    websocketRef.current.onerror = (error) => {
      console.error("[error]", error);
      toast.error("WebSocket connection failed");
      setLoading(false);
    };

    websocketRef.current.onclose = () =>
      console.log("[close] Connection closed");
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token1");

    if (token && validateToken(token)) {
      setLoading(true);
      connectWebSocket(token);
    } else {
      setLoading(false);
      toast.error("Invalid or missing authorization token.");
    }

    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, [selectedAccount]); // Re-run on selectedAccount change to get the balance of the selected account

  const handleLogout = () => {
    logout();
    window.location.href = redirect_uri;
  };

  return (
    <>
      <nav className="sticky top-0 w-full bg-transparent shadow-none z-50">
        <div className="container mx-auto flex justify-between items-center py-4">
          {/* Larger Logo without shadow or rounded corners */}
          <div className="flex items-center space-x-3">
            <img
              src={logoImage}
              alt="Prime-D Logo"
              className="w-40 h-32" // Increased the size of the logo
            />
          </div>

          {/* Links */}
          <div className="space-x-4">
            <Link to="/primeTreads" className="text-gray-800 font-bold">
              Prime-Treads
            </Link>
          </div>

          {/* User Account, Sign-In/Signup, or Telegram Button */}
          <div className="flex items-center space-x-4">
            {user ? (
              loading ? (
                <div className="flex items-center">
                  <PuffLoader color="#000000" size={24} />
                  <span className="text-gray-800 ml-2">Loading...</span>
                </div>
              ) : (
                <div className="text-gray-800 font-semibold flex items-center">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                      <button
                        className={`px-3 py-1 rounded ${
                          selectedAccount === "demo"
                            ? "bg-gray-700 text-white"
                            : "text-gray-400"
                        }`}
                        onClick={() => setSelectedAccount("demo")}
                      >
                        Demo
                      </button>
                      <button
                        className={`px-3 py-1 rounded ml-2 ${
                          selectedAccount === "real"
                            ? "bg-gray-700 text-white"
                            : "text-gray-400"
                        }`}
                        onClick={() => setSelectedAccount("real")}
                      >
                        Real
                      </button>
                    </div>
                    {selectedAccount && balances[selectedAccount] ? (
                      <>
                        <span className="block">
                          Balance: ${balances[selectedAccount].balance}
                        </span>
                        <span className="block">
                          Account ID: {balances[selectedAccount].account_id}
                        </span>
                        <span className="block">
                          Currency: {balances[selectedAccount].currency}
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-400">Loading balance...</span>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white font-semibold py-1 px-4 rounded-full hover:bg-red-700 ml-4"
                  >
                    Logout
                  </button>
                </div>
              )
            ) : (
              <>
                <a
                  href={oauthUrl}
                  className="bg-gray-700 text-white font-semibold py-2 px-4 rounded-full hover:bg-gray-600"
                >
                  Sign-In/Signup
                </a>
                <a
                  href="https://t.me/+JhrZnJHbz701YWU8"
                  className="flex items-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={telegramIcon}
                    alt="Telegram Icon"
                    className="h-6 w-6 rounded-full mr-2"
                  />
                  Join Telegram
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Display user profile details if available */}
      {userProfile && (
        <div className="p-4">
          <h2 className="text-lg font-semibold">User Profile</h2>
          <p>Full Name: {userProfile.fullname}</p>

          <p>Email: {userProfile.email}</p>
          <p>Login ID: {userProfile.loginid}</p>
          <p>Country: {userProfile.country}</p>
          <p>Language: {userProfile.language}</p>
          <p>Timezone: {userProfile.timezone}</p>
          <p>Broker: {userProfile.broker}</p>
          <p>Created_at: {userProfile.created_at}</p>
          <P>Local_currencies: {userProfile.local_currencies}</P>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default NavBar;
