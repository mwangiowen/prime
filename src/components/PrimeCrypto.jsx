import React, { useEffect, useRef } from "react";

let tvScriptLoadingPromise;

function CryptoWidget({ darkMode }) {
  const onLoadScriptRef = useRef();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("tradingview_fullscreen") &&
        "TradingView" in window
      ) {
        new window.TradingView.widget({
          width: "100%",
          height: "100%",
          symbol: "BINANCE:BTCUSDT",
          interval: "D",
          timezone: "Etc/UTC",
          theme: darkMode ? "dark" : "light",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_fullscreen",
          details: true, // Enable chart analysis tools
          withdateranges: true, // Add date range options
          hide_side_toolbar: false, // Show editing tools
        });
      }
    }
  }, [darkMode]);

  return (
    <div
      id="tradingview_fullscreen"
      style={{
        width: "100vw", // Full viewport width
        height: "100vh", // Full viewport height
        position: "fixed", // Ensure it stays full screen
        top: 0,
        left: 0,
        overflow: "hidden",
      }}
    />
  );
}

export default function AppLayout() {
  return <CryptoWidget darkMode={true} />;
}
