// Index.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import Bot from "../pages/Bot";
import Trading from "../pages/Trading";
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bot" element={<Bot />} />
          <Route path="/trading" element={<Trading />} />
        </Routes>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Index;
