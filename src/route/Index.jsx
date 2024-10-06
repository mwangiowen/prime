import React from "react";

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
        </Routes>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Index;
