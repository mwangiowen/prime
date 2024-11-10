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
  const token = "***********o1Pa"; // Replace with your actual API token

  const connectWebSocket = () => {
    websocketRef.current = new WebSocket(
      `wss://ws.derivws.com/websockets/v3?app_id=${app_id}`
    );

    websocketRef.current.onopen = () => {
      console.log("[open] Connection established");
      websocketRef.current.send(JSON.stringify({ authorize: token }));
    };

    websocketRef.current.onmessage = (event) => {
      const response = JSON.parse(event.data);
      console.log("Response from WebSocket:", response);

      if (response.error) {
        setError(response.error.message);
        toast.error(`Error: ${response.error.message}`);
        setLoading(false);
      } else if (response.msg_type === "authorize") {
        setUserProfile(response.authorize);
        websocketRef.current.send(
          JSON.stringify({ balance: 1, account: selectedAccount })
        );
      } else if (response.msg_type === "balance") {
        const accountType = selectedAccount === "demo" ? "virtual" : "real";
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
    if (token) {
      setLoading(true);
      connectWebSocket();
    } else {
      setLoading(false);
    }

    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, [selectedAccount]);

  const handleLogout = () => {
    logout();
    window.location.href = `https://oauth.deriv.com/oauth2/authorize?app_id=${app_id}`;
  };

  return (
    <>
      <nav className="bg-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <img
              src={logoImage}
              alt="Prime-D Logo"
              className="w-10 h-10 rounded-full shadow-lg"
            />
            <span className="text-gray-800 font-bold text-xl">Prime-D</span>
          </div>

          {/* Links */}
          <div className="space-x-4">
            <Link to="/primeTreads" className="text-gray-800 font-bold">
              Prime-Treads
            </Link>
          </div>

          {/* User Account Info, Sign-In/Signup, or Telegram Button */}
          <div className="flex items-center space-x-4">
            {user ? (
              loading ? (
                <div className="flex items-center">
                  <PuffLoader color="#000000" size={24} />
                  <span className="text-gray-800 ml-2">Loading...</span>
                </div>
              ) : (
                <div className="text-gray-800 font-semibold flex items-center space-x-4">
                  {/* Account Info */}
                  <div className="flex flex-col">
                    <div className="flex items-center mb-2 space-x-4">
                      <button
                        className={`px-4 py-2 rounded-full text-white ${
                          selectedAccount === "demo"
                            ? "bg-gray-800"
                            : "bg-gray-400"
                        }`}
                        onClick={() => setSelectedAccount("demo")}
                      >
                        Demo
                      </button>
                      <button
                        className={`px-4 py-2 rounded-full text-white ${
                          selectedAccount === "real"
                            ? "bg-gray-800"
                            : "bg-gray-400"
                        }`}
                        onClick={() => setSelectedAccount("real")}
                      >
                        Real
                      </button>
                    </div>
                    {balances[selectedAccount] ? (
                      <div>
                        <span className="block">
                          Balance: {balances[selectedAccount].currency}{" "}
                          {balances[selectedAccount].balance.toFixed(2)}
                        </span>
                        <span className="block">
                          Account ID: {balances[selectedAccount].account_id}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400">Loading balance...</span>
                    )}
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-700 ml-4"
                  >
                    Logout
                  </button>
                </div>
              )
            ) : (
              <>
                <a
                  href={`https://oauth.deriv.com/oauth2/authorize?app_id=${app_id}`}
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

      <ToastContainer />
    </>
  );
};

export default NavBar;
