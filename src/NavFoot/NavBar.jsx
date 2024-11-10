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
  const [userProfile, setUserProfile] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false); // Toggle for profile menu
  const [selectedAccount, setSelectedAccount] = useState("demo");
  const websocketRef = useRef(null);

  const app_id = "64522";
  const redirect_uri = "https://prime-jh3u.vercel.app/";
  const oauthUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${app_id}&scope=read&redirect_uri=${redirect_uri}`;

  const connectWebSocket = (token) => {
    websocketRef.current = new WebSocket(
      `wss://ws.derivws.com/websockets/v3?app_id=${app_id}`
    );

    websocketRef.current.onopen = () => {
      console.log("[open] Connection established");
      if (token) {
        websocketRef.current.send(JSON.stringify({ authorize: token }));
      } else {
        toast.error("Authorization token is missing.");
        setLoading(false);
      }
    };

    websocketRef.current.onmessage = (event) => {
      const response = JSON.parse(event.data);
      console.log("Response from WebSocket:", response);
      if (response.msg_type === "authorize") {
        setUserProfile(response.authorize);
        websocketRef.current.send(
          JSON.stringify({ balance: 1, account: selectedAccount })
        );
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
    if (token) {
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
  }, [selectedAccount]);

  const handleLogout = () => {
    logout();
    window.location.href = redirect_uri;
  };

  const toggleProfileMenu = () => setProfileOpen(!profileOpen); // Toggle profile menu

  return (
    <>
      <nav
        className={`sticky top-0 w-full bg-transparent shadow-none z-50 ${
          user ? "h-16" : "h-20"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center py-4">
          {/* Logo with Link to Home */}
          <div className="flex items-center space-x-3">
            <Link to="/">
              <img
                src={logoImage}
                alt="Prime-D Logo"
                className="w-40 h-32" // Logo size remains unchanged
              />
            </Link>
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
                  {/* Profile dropdown */}
                  <div className="relative">
                    <button
                      onClick={toggleProfileMenu}
                      className="flex items-center space-x-2"
                    >
                      <img
                        src={userProfile?.avatar || logoImage}
                        alt="Profile Avatar"
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{userProfile?.fullname}</span>
                    </button>

                    {/* Profile dropdown menu */}
                    {profileOpen && (
                      <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md py-2 w-48">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          View Profile
                        </Link>
                        <Link
                          to="/settings"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Account Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
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
          <p>Created At: {userProfile.created_at}</p>
          <p>Local Currencies: {userProfile.local_currencies}</p>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default NavBar;
