import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left - Brand Name */}
        <Link to="/" className="text-white font-bold text-xl">
          Prime-D
        </Link>

        {/* Right - Login & Signup Links */}
        <div className="space-x-4">
          <Link
            to="/signIn"
            className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-full hover:bg-blue-100"
          >
            Sign-In
          </Link>
          <Link
            to="/signUp"
            className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-full hover:bg-blue-100"
          >
            Sign-up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
