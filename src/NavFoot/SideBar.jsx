// Sidebar.js
import React from "react";

export default function Sidebar() {
  return (
    <div
      style={{ width: "100%", height: "100%", padding: "1rem", color: "#fff" }}
    >
      <h2>Sidebar</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li>
          <a href="#home" style={{ color: "#fff", textDecoration: "none" }}>
            Home
          </a>
        </li>
        <li>
          <a
            href="#dashboard"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Dashboard
          </a>
        </li>
        <li>
          <a href="#market" style={{ color: "#fff", textDecoration: "none" }}>
            Market
          </a>
        </li>
        <li>
          <a href="#settings" style={{ color: "#fff", textDecoration: "none" }}>
            Settings
          </a>
        </li>
        <li>
          <a href="#help" style={{ color: "#fff", textDecoration: "none" }}>
            Help
          </a>
        </li>
      </ul>
    </div>
  );
}
