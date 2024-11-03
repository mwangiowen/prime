import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const OAuthCallback = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userData = {
      name: params.get("name") || "User's Name",
      token: params.get("token1"),
    };

    login(userData); // Save user data with login

    navigate("/");
  }, [login, navigate]);

  return <div>Loading...</div>;
};

export default OAuthCallback;
