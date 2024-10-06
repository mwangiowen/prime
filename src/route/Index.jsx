import React from "react";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import Landing from "../pages/Landing";
import { Route, Routes } from "react-router-dom";
import NavBar from "../NavFoot/NavBar";
import Footer from "../NavFoot/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <NavBar />

      {/* Main content area */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Index;
