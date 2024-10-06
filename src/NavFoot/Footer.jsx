import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white py-6">
      <div className="container mx-auto px-4 flex justify-between">
        {/* Left - Company Info */}
        <div>
          <h4 className="text-xl font-bold mb-2">Prime-D</h4>
          <p>© {new Date().getFullYear()} Prime-D. All Rights Reserved.</p>
        </div>

        {/* Middle - Links */}
        <div className="space-y-2">
          <a href="/about" className="block hover:underline">
            About Us
          </a>
          <a href="/contact" className="block hover:underline">
            Contact
          </a>
          <a href="/terms" className="block hover:underline">
            Terms of Service
          </a>
          <a href="/privacy" className="block hover:underline">
            Privacy Policy
          </a>
        </div>

        {/* Right - Social Media Icons */}
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
