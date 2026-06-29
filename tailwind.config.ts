import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      filter: {
        none: "none",
        blur: "blur(4px)",
      },
      backdropFilter: {
        none: "none",
        blur: "blur(10px)",
      },
      keyframes: {
        logoShiningBG: {
          "0%": {
            backgroundColor: "black",
            opacity: 1,
          },
          "50%": {
            backgroundColor: "black",
          },
          "100%": {
            opacity: 0.8,
          },
        },
        logoShiningFG: {
          "0%": {
            opacity: 0,
            transform: "scale(1.3)",
            filter:
              "blur(0) brightness(0) drop-shadow(0 0 0px rgba(255, 255, 255, 0))",
          },
          "20%": {
            opacity: 0,
            transform: "scale(1.25)",
          },
          "30%": {
            opacity: 1,
            filter:
              "blur(5px) brightness(5) drop-shadow(0 0 40px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 60px rgba(100, 200, 255, 0.5))",
            transform: "scale(1.2)",
          },
          "100%": {
            opacity: 0.05,
            filter:
              "blur(2px) brightness(1) drop-shadow(0 0 10px rgba(255, 255, 255, 0.4))",
            transform: "scale(1.0)",
          },
        },
      },
      animation: {
        logoShiningBG: "logoShiningBG 10s ",
        logoShiningFG: "logoShiningFG 10s ease-out forwards",
      },
    },
    variants: {
      extend: {
        filter: ["hover", "focus"],
        backdropFilter: ["hover", "focus"],
      },
    },
  },
  plugins: [],
};

export default config;