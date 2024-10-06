import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const OAuthCallback = () => {
  const { login } = useAuth();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    // Parse the URL to extract user data
    const params = new URLSearchParams(window.location.search);
    const userData = {
      // Extract necessary data, e.g.:
      name: params.get("name"),
      token: params.get("token"), // Example token
    };

    // Save the user data
    login(userData);

    // Redirect to home or another page
    navigate("/"); // Use navigate instead of history.push
  }, [login, navigate]);

  return <div>Loading...</div>; // Show a loading state while processing
};

export default OAuthCallback;
