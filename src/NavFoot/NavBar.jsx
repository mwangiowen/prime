import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [user, setUser] = useState(null);

  // Deriv OAuth configuration
  const app_id = "64522"; // Your application ID from Deriv
  const redirect_uri = "https://yourapp.com/oauth-callback"; // Your redirect URL after login
  const oauthUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${app_id}&scope=read&redirect_uri=${redirect_uri}`;

  // Fetch user data after login (mock implementation)
  useEffect(() => {
    // Check if user data is stored in localStorage or state after OAuth login
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Mock function to log out
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left - Brand Name */}
        <Link to="/" className="text-white font-bold text-xl">
          Prime-D
        </Link>

        {/* Right - Conditional rendering based on user login status */}
        <div className="space-x-4 flex items-center">
          {user ? (
            <>
              {/* If user is logged in, show profile and name */}
              <span className="text-white">{user.name}</span>
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <button
                onClick={handleLogout}
                className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-full hover:bg-blue-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* If no user is logged in, show sign-in and sign-up links */}
              <a
                href={oauthUrl}
                className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-full hover:bg-blue-100"
              >
                Sign-In
              </a>
              <Link
                to="/signUp"
                className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-full hover:bg-blue-100"
              >
                Sign-up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
