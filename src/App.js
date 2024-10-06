import React from "react";
import Index from "./route/Index";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Index />
    </Router>
  );
};

export default App;
