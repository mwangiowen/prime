import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners"; // React spinner

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // OAuth Setup
  const app_id = "64522"; // Your application ID from Deriv
  const redirect_uri = "https://prime-jh3u.vercel.app/"; // Your redirect URL after login
  const oauthUrl = `https://oauth.deriv.com/oauth2/authorize?app_id=${app_id}&scope=read&redirect_uri=${redirect_uri}`;

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const account = queryParams.get("acct1");
    const token = queryParams.get("token1");

    if (account && token) {
      setIsLoggedIn(true);
      // Fetch the balance when user is logged in
      fetchBalance(account, token);
    } else {
      setIsLoggedIn(false);
      setLoading(false);
    }
  }, []);

  const fetchBalance = async (account, token) => {
    try {
      const response = await fetch(
        `https://yourapi.com/amount?acct=${account}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer FlhEKmK8yCQHeCy`, // Use your API token here
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch balance");
      }

      const data = await response.json();
      setBalance(data.amount); // Assuming the balance is returned in `data.amount`
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left - Brand Name */}
        <Link to="/" className="text-white font-bold text-xl">
          Prime-D
        </Link>

        {/* Right - Conditionally render balance or Sign-In/Signup Links */}
        <div className="space-x-4">
          {isLoggedIn ? (
            loading ? (
              <div className="flex items-center">
                {/* Spinner while loading */}
                <PuffLoader color="#ffffff" size={24} />
                <span className="text-white ml-2">Fetching balance...</span>
              </div>
            ) : error ? (
              <span className="text-red-500">Error: {error}</span>
            ) : (
              <span className="text-white font-semibold">
                Balance: ${balance}
              </span>
            )
          ) : (
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
