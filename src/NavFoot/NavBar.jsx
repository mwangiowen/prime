import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../auth/AuthContext";
import { FaChevronDown } from "react-icons/fa";
import logoImage from "../assets/logo.jpg";
import telegramIcon from "../assets/telegramicon.png";

const NavBar = () => {
  const { user, login, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("demo");
  const websocketRef = useRef(null);

  const app_id = "64522";
  const redirect_uri = "https://prime-jh3u.vercel.app/";
  const oauthUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${app_id}&scope=read&redirect_uri=${redirect_uri}`;

  const connectWebSocket = (token) => {
    if (!token) {
      toast.error("Authorization token is missing.");
      setLoading(false);
      return;
    }

    websocketRef.current = new WebSocket(
      `wss://ws.derivws.com/websockets/v3?app_id=${app_id}`
    );

    websocketRef.current.onopen = () => {
      websocketRef.current.send(JSON.stringify({ authorize: token }));
    };

    websocketRef.current.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.msg_type === "authorize") {
        setUserProfile(response.authorize);
        websocketRef.current.send(
          JSON.stringify({ balance: 1, account: selectedAccount })
        );
        setLoading(false);
      }
    };

    websocketRef.current.onerror = () => {
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

  const toggleProfileMenu = () => setProfileOpen(!profileOpen);

  return (
    <>
      <nav className="w-full py-4 bg-white/60 backdrop-blur-md shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4 md:flex-row flex-col">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logoImage} alt="Prime-D Logo" className="h-10" />
            <span className="text-lg font-semibold text-gray-700">Prime-D</span>
          </Link>

          {/* Links */}
          <div className="space-x-6 flex flex-col md:flex-row mt-2 md:mt-0 text-gray-700">
            <Link to="/primeTreads" className="hover:text-gray-900">
              Prime-Treads
            </Link>
            <Link to="/features" className="hover:text-gray-900">
              Features
            </Link>
            <Link to="/pricing" className="hover:text-gray-900">
              Pricing
            </Link>
            <Link to="/about" className="hover:text-gray-900">
              About
            </Link>
            <Link to="/contact" className="hover:text-gray-900">
              Contact
            </Link>
          </div>

          {/* User / Sign-In / Telegram */}
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            {user ? (
              loading ? (
                <div className="flex items-center space-x-2">
                  <PuffLoader color="#000000" size={24} />
                  <span>Loading...</span>
                </div>
              ) : (
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
                    <FaChevronDown className="text-gray-600" />
                  </button>

                  {/* Profile dropdown */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 bg-white/80 backdrop-blur-md shadow-lg rounded-lg py-2 w-56">
                      <div className="px-4 py-2 text-gray-800">
                        <p>
                          <strong>Full Name:</strong> {userProfile.fullname}
                        </p>
                        <p>
                          <strong>Email:</strong> {userProfile.email}
                        </p>
                        <p>
                          <strong>Login ID:</strong> {userProfile.loginid}
                        </p>
                        <p>
                          <strong>Country:</strong> {userProfile.country}
                        </p>
                        <p>
                          <strong>Language:</strong> {userProfile.language}
                        </p>
                        <p>
                          <strong>Timezone:</strong> {userProfile.timezone}
                        </p>
                        <p>
                          <strong>Broker:</strong> {userProfile.broker}
                        </p>
                        <p>
                          <strong>Created At:</strong> {userProfile.created_at}
                        </p>
                        <p>
                          <strong>Local Currencies:</strong>{" "}
                          {userProfile.local_currencies}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )
            ) : (
              <>
                <a
                  href={oauthUrl}
                  className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                >
                  Sign-In/Signup
                </a>
                <a
                  href="https://t.me/+JhrZnJHbz701YWU8"
                  className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400"
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
