import React from "react";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to [Your Trading Platform]
        </h1>
        <p className="text-lg mb-8">
          Experience seamless trading with advanced tools and market insights.
        </p>
        <a
          href="/signup"
          className="bg-white text-blue-600 px-6 py-3 rounded shadow-md hover:bg-gray-200 transition duration-300"
        >
          Get Started
        </a>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4">
              User-Friendly Interface
            </h3>
            <p>
              Our platform is designed for both beginners and experienced
              traders, providing an intuitive and easy-to-navigate experience.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Advanced Tools</h3>
            <p>
              Utilize cutting-edge trading tools and analytics to make informed
              decisions and maximize your trading potential.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
            <p>
              Our dedicated support team is available around the clock to assist
              you with any questions or issues.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-200 py-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Trading?</h2>
        <a
          href="/signup"
          className="bg-blue-600 text-white px-6 py-3 rounded shadow-md hover:bg-blue-700 transition duration-300"
        >
          Sign Up Now
        </a>
      </div>
    </div>
  );
};

export default Landing;
