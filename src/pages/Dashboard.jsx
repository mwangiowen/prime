// Dashboard.js
import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      {/* Account Overview Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Account Overview</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600">Account Balance: <span className="font-bold">$10,500.00</span></p>
          <p className="text-gray-600">Equity: <span className="font-bold">$12,300.00</span></p>
          <p className="text-gray-600">Profit/Loss: <span className="font-bold text-green-500">+$800.00</span></p>
        </div>
      </div>

      {/* Market Summary Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Market Summary</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between">
            <p className="text-gray-600">S&P 500: <span className="font-bold text-green-500">+1.3%</span></p>
            <p className="text-gray-600">NASDAQ: <span className="font-bold text-red-500">-0.5%</span></p>
            <p className="text-gray-600">DOW JONES: <span className="font-bold text-green-500">+0.8%</span></p>
          </div>
        </div>
      </div>

      {/* Recent Trades Section */}
      <div>
        <h2 className="text-3xl font-bold mb-4">Recent Trades</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ul>
            <li className="flex justify-between mb-4">
              <span>Buy AAPL</span>
              <span className="text-green-500 font-bold">+ $300.00</span>
            </li>
            <li className="flex justify-between mb-4">
              <span>Sell TSLA</span>
              <span className="text-red-500 font-bold">- $150.00</span>
            </li>
            <li className="flex justify-between">
              <span>Buy AMZN</span>
              <span className="text-green-500 font-bold">+ $450.00</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
