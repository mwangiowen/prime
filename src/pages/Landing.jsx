// Landing.js
import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">
        Welcome to Our Trading Platform
      </h1>
      <p className="text-lg mb-8">Choose a section to get started:</p>

      <div className="flex space-x-4">
        <Link
          to="/dashboard"
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
        >
          Go to Dashboard
        </Link>
        <Link
          to="/bot"
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
        >
          Go to Bot
        </Link>
        <Link
          to="/trading"
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
        >
          Go to Trading
        </Link>
      </div>
    </div>
  );
};

export default Landing;
