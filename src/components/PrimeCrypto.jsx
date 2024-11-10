import React, { useEffect, useRef } from "react";

let tvScriptLoadingPromise;

function CryptoWidget({ darkMode = false }) {
  const onLoadScriptRef = useRef();
  const widgetRef = useRef();

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

    tvScriptLoadingPromise.then(() => {
      if (onLoadScriptRef.current) {
        onLoadScriptRef.current();
      }
    });

    return () => {
      onLoadScriptRef.current = null;
      if (widgetRef.current && widgetRef.current.remove) {
        widgetRef.current.remove();
        widgetRef.current = null;
      }
    };

    function createWidget() {
      const container = document.getElementById("tradingview_fullscreen");
      if (container && "TradingView" in window) {
        widgetRef.current = new window.TradingView.widget({
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
          details: true,
          withdateranges: true,
          hide_side_toolbar: false,
        });
      }
    }
  }, [darkMode]);

  return (
    <div
      id="tradingview_fullscreen"
      style={{
        width: "100vw",
        height: "calc(100vh - 60px)", // Adjust height to fit below navbar
        position: "fixed",
        top: "60px", // Offset to place it below the navbar
        left: 0,
        overflow: "hidden",
      }}
    />
  );
}

export default function AppLayout() {
  return (
    <div>
      <CryptoWidget darkMode={false} />{" "}
      {/* Set darkMode to false for light mode */}
    </div>
  );
}
