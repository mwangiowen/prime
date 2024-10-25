import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in by checking localStorage or a similar method
  useEffect(() => {
    const userToken = localStorage.getItem("userToken"); // Example key for storing login token
    if (userToken) {
      setIsLoggedIn(true);
    }
  }, []);

  // Deriv OAuth configuration
  const app_id = "64522"; // Your application ID from Deriv
  const redirect_uri = "https://yourapp.com/oauth-callback"; // Your redirect URL after login
  const oauthUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${app_id}&scope=read&redirect_uri=${redirect_uri}`;

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left - Brand Name */}
        <Link to="/" className="text-white font-bold text-xl">
          Prime-D
        </Link>

        {/* Right - Conditionally render the Sign-In/Signup Links */}
        <div className="space-x-4">
          {!isLoggedIn && (
            <a
              href={oauthUrl}
              className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-full hover:bg-blue-100"
            >
              Sign-In/Signup
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
