import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../assets/logo.jpg";
import Ticker from "../pages/Ticker";
import Starts from "../components/Starts";

const Landing = ({ darkMode }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-blue-300 text-gray-800">
      {/* Header */}
      <header className="absolute top-6 left-10 text-lg md:text-xl font-semibold flex items-center space-x-3">
        <img
          src={logoImage}
          alt="Logo"
          className="w-12 h-12 rounded-full shadow-lg"
        />
      </header>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-center tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600 drop-shadow-lg">
        BEST DERIV/BINARY TRADING WEB
      </h1>

      {/* Subheading with gradient */}
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-center tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-500">
        GET AN EDGE <br /> ON DERIV MARKETS
      </h2>

      {/* Description */}
      <p className="text-base sm:text-lg md:text-xl mb-12 text-center max-w-2xl text-gray-700 leading-relaxed">
        PRIME-D revolutionizes trading with its free app, offering advanced
        analysis tools and cutting-edge binary/deriv trading bots.
      </p>

      {/* Action Buttons */}
      <div className="flex space-x-6 mb-12">
        <Link
          to="/dashboard"
          className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Get Started
        </Link>
        <Link
          to="/features"
          className="border border-red-500 text-red-500 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold shadow-lg hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105"
        >
          Explore Features
        </Link>
      </div>

      {/* Ticker and Stars */}
      <div className="mb-8 w-full max-w-4xl">
        {/* Uncomment Ticker component once ready */}
        <Ticker darkMode={darkMode} />
      </div>
      <div>
        <Starts />
      </div>

      {/* Footer or other elements */}
      <div className="absolute bottom-6 right-8 p-4"></div>
    </div>
  );
};

export default Landing;
