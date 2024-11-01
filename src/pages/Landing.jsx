// Landing.js
import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white">
      <header className="absolute top-4 left-8 text-xl font-semibold">
        <span className="flex items-center space-x-2">
          <img src="../assets/logo.png" alt="Logo" className="w-10 h-10" />
        </span>
      </header>

      <h1 className="text-5xl font-extrabold mb-6 text-center">
        BEST DERIV/BINARY TRADING APP
      </h1>
      <h2 className="text-7xl font-bold mb-4 text-center">
        GET AN EDGE <br /> ON DERIV MARKETS
      </h2>
      <p className="text-lg mb-10 text-center max-w-xl">
        PRIME-D revolutionizes trading with its free app, offering advanced
        analysis tools and cutting-edge binary/deriv trading bots.
      </p>

      <div className="flex space-x-4">
        <Link
          to="/dashboard"
          className="bg-red-500 text-white px-8 py-3 rounded-full font-medium hover:bg-red-600 transition duration-300"
        >
          Get Started
        </Link>
        <Link
          to="/features"
          className="bg-transparent border border-red-500 text-red-500 px-8 py-3 rounded-full font-medium hover:bg-red-500 hover:text-white transition duration-300"
        >
          Explore Features
        </Link>
      </div>

      <div className="absolute bottom-0 right-0 p-4">
        <img
          src="/path/to/rocket.png"
          alt="Rocket Illustration"
          className="w-60 opacity-75"
        />
      </div>
    </div>
  );
};

export default Landing;
