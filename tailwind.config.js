/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("flowbite/plugin")],
  theme: {
    fontFamily: {
      sans: [
        "var(--nunito-variable)",
        "var(--noto-sans-jp-variable)",
        "var(--noto-sans-kr-variable)",
      ],
    },

    colors: {
      spotify: {
        background: "#121212",
        primary: "#1ed760",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
};
