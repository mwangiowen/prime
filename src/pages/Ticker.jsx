// Ticker.js
import React, { useEffect, useRef } from "react";

const Ticker = ({ darkMode }) => {
  const widgetContainerRef = useRef(null);

  useEffect(() => {
    if (!widgetContainerRef.current) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
        { proName: "FOREXCOM:NSXUSD", title: "US 100" },
        { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "adaptive",
      locale: "in",
    });

    widgetContainerRef.current.innerHTML = ""; // Clear previous widget
    widgetContainerRef.current.appendChild(script); // Append new script

    return () => {
      widgetContainerRef.current.innerHTML = ""; // Clean up on unmount
    };
  }, [darkMode]);

  return (
    <div
      className="tradingview-widget-container ticker-widget-container py-7"
      style={{ maxWidth: "100%", width: "1000px", margin: "0 auto" }}
    >
      <div
        ref={widgetContainerRef}
        className="tradingview-widget-container__widget"
      ></div>
    </div>
  );
};

export default Ticker;
