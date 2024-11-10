import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../auth/AuthContext";
import Logo from "./Logo";
import NavigationLinks from "./NavigationLinks";
import UserProfile from "./UserProfile";
import SignInTelegramLinks from "./SignInTelegramLinks";
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
          <Logo />
          <NavigationLinks />
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            {user ? (
              <UserProfile
                user={user}
                userProfile={userProfile}
                loading={loading}
                profileOpen={profileOpen}
                toggleProfileMenu={toggleProfileMenu}
              />
            ) : (
              <SignInTelegramLinks oauthUrl={oauthUrl} />
            )}
          </div>
        </div>
      </nav>

      <ToastContainer />
    </>
  );
};

export default NavBar;
