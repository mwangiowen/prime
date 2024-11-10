import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../auth/AuthContext";

const NavBar = () => {
  const { user, login, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [balances, setBalances] = useState({
    demo: null,
    real: null,
  });
  const [selectedAccount, setSelectedAccount] = useState("demo");
  const websocketRef = useRef(null); // To hold WebSocket instance

  const app_id = "64522";
  const redirect_uri = "https://prime-jh3u.vercel.app/";
  const oauthUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${app_id}&scope=read&redirect_uri=${redirect_uri}`;

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token1");

    if (token) {
      setLoading(true);
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
          // After authorization, request balances for both accounts
          websocketRef.current.send(
            JSON.stringify({ balance: 1, account: "demo" })
          );
          websocketRef.current.send(
            JSON.stringify({ balance: 1, account: "real" })
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

      websocketRef.current.onclose = () => {
        console.log("[close] Connection closed");
      };

      // Request balances every 10 seconds
      const balanceInterval = setInterval(() => {
        if (websocketRef.current.readyState === WebSocket.OPEN) {
          websocketRef.current.send(
            JSON.stringify({ balance: 1, account: "demo" })
          );
          websocketRef.current.send(
            JSON.stringify({ balance: 1, account: "real" })
          );
        }
      }, 10000);

      return () => {
        clearInterval(balanceInterval);
        websocketRef.current.close();
      };
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = redirect_uri;
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-gray-100 font-bold text-xl">
            Prime-D
          </Link>
          <Link
            to="/primeTreads"
            className="text-gray-100 font-bold justify-end"
          >
            Prime-Treads
          </Link>
          <div className="space-x-4">
            {user ? (
              loading ? (
                <div className="flex items-center">
                  <PuffLoader color="#ffffff" size={24} />
                  <span className="text-gray-100 ml-2">Loading...</span>
                </div>
              ) : (
                <div className="text-gray-100 font-semibold flex items-center">
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-2">
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
                    className="bg-red-600 text-gray-100 font-semibold py-1 px-4 rounded-full hover:bg-red-700 ml-4"
                  >
                    Logout
                  </button>
                </div>
              )
            ) : (
              <a
                href={oauthUrl}
                className="bg-gray-700 text-gray-100 font-semibold py-2 px-4 rounded-full hover:bg-gray-600"
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
