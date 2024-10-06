import React from "react";
import Landing from "../pages/Landing";
import { Route, Routes } from "react-router-dom";
import NavBar from "../NavFoot/NavBar";
import Footer from "../NavFoot/Footer";
import OAuthCallback from "../auth/OAuthCallback"; // Adjust the path as necessary
import { AuthProvider } from "../auth/AuthContext";
const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthProvider>
        <NavBar />
        {/* Other components */}
      </AuthProvider>
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/oauth-callback" element={<OAuthCallback />} />{" "}
          {/* Add OAuth callback route */}
        </Routes>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Index;
