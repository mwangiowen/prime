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
        document.getElementById("tradingview_20a86") &&
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
          locale: "in",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_20a86",
        });
      }
    }
  }, [darkMode]);

  return (
    <div id="tradingview_20a86" style={{ width: "100%", height: "100%" }} />
  );
}

export default function AppLayout() {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Main Content (Centered Widget) */}
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CryptoWidget darkMode={true} />
      </div>
    </div>
  );
}
