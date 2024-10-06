const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#000000",
        background: "#f2fcfc",
        primary: "#0018f4",
        secondary: "#73e2f4",
        accent: "#f8d061",
      },

      fontFamily: {
        heading: ["Roboto", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".glass-table": {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.25)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
        },
      };

      addUtilities(newUtilities, {
        variants: ["responsive", "hover", "dark"],
      });
    }),
  ],
};
