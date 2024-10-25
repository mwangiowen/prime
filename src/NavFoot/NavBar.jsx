import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners"; // React spinner for loading state

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
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
      // Fetch user details when user is logged in
      fetchUserDetails(account, token);
    } else {
      setIsLoggedIn(false);
      setLoading(false);
    }
  }, []);

  const fetchUserDetails = async (account, token) => {
    try {
      // Assume there's an API endpoint for fetching user data
      const response = await fetch(
        `https://api.deriv.com/api/v1/account/details`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer oqqwae3Ugan4p4j`, // Use your new API token here
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const data = await response.json();
      setUserData({
        name: data.name, // Assuming API returns the name
        balance: data.balance, // Assuming API returns the balance
        account_id: data.account_id, // Assuming API returns account ID
        currency: data.currency, // Assuming API returns currency
      });
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

        {/* Right - Conditionally render user details or Sign-In/Signup Links */}
        <div className="space-x-4">
          {isLoggedIn ? (
            loading ? (
              <div className="flex items-center">
                {/* Spinner while loading */}
                <PuffLoader color="#ffffff" size={24} />
                <span className="text-white ml-2">Loading details...</span>
              </div>
            ) : error ? (
              <span className="text-red-500">Error: {error}</span>
            ) : (
              <div className="text-white font-semibold">
                {/* Display user details */}
                <span className="block">Name: {userData.name}</span>
                <span className="block">Balance: ${userData.balance}</span>
                <span className="block">Account ID: {userData.account_id}</span>
                <span className="block">Currency: {userData.currency}</span>
              </div>
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
