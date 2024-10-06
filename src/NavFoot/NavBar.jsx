import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; // Adjust the path as necessary

const NavBar = () => {
  const authContext = useAuth();

  // Check if the auth context is available
  if (!authContext) {
    console.error(
      "AuthContext is not available. Make sure NavBar is wrapped in AuthProvider."
    );
    return null; // Or some fallback UI
  }

  const { user, login, logout } = authContext;

  // Deriv OAuth configuration
  const app_id = "64522"; // Your application ID from Deriv
  const redirect_uri = "https://yourapp.com/oauth-callback"; // Your redirect URL after login

  // OAuth URLs
  const signInUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${app_id}&scope=read&redirect_uri=${redirect_uri}`;
  const signUpUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${app_id}&scope=read&redirect_uri=${redirect_uri}&signup=true`;

  // Handle OAuth callback (this should be in your OAuth callback component)
  // This is just a placeholder to demonstrate
  const handleOAuthCallback = (data) => {
    // Assume `data` contains user info from the OAuth response
    login(data); // Store user info
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left - Brand Name */}
        <Link to="/" className="text-white font-bold text-xl">
          Prime-D
        </Link>

        {/* Right - Conditional Rendering */}
        <div className="space-x-4">
          {user ? (
            <>
              <span className="text-white">Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-full hover:bg-blue-100"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              {/* Sign-In link triggers OAuth login */}
              <a
                href={signInUrl}
                className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-full hover:bg-blue-100"
              >
                Sign-In
              </a>
              {/* Sign-Up link triggers OAuth sign-up */}
              <a
                href={signUpUrl}
                className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-full hover:bg-blue-100"
              >
                Sign-Up
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
