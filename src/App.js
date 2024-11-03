import React from "react";
import Index from "./route/Index";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext"; // Import AuthProvider

import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      {" "}
      <Router>
        <Index />
      </Router>
    </AuthProvider>
  );
};

export default App;
