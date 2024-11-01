import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const OAuthCallback = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userData = {
      name: params.get("name") || "User's Name", // Default name if not provided
      token: params.get("token1"), // Ensure you retrieve the correct token
    };

    // Save the user data
    login(userData);

    // Redirect to home or another page
    navigate("/");
  }, [login, navigate]);

  return <div>Loading...</div>;
};

export default OAuthCallback;
