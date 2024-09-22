/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionProperty: { sidebar: "width, transform", width: "width" },
      colors: {
        "forest-100": "#83D898",
        "forest-200": "#45C465",
        "forest-300": "#3BBA5B",
        "forest-400": "#329D4D",
        "forest-500": "#319B4B",
        "forest-600": "#2C8C44",
        "forest-700": "#277C3C",
        "forest-800": "#226D35",
        "forest-900": "#1D5D2D",

        "azure-100": "#3B90F7",
        "azure-200": "#2884F6",
        "azure-300": "#1479F5",
        "azure-400": "#0A6FEB",
        "azure-500": "#0966D7",
        "azure-600": "#085DC4",
        "azure-700": "#0753B0",
        "azure-800": "#074A9D",
        "azure-900": "#064188",

        "accent-50": "#FDFDFD",
        "accent-100": "#EBEEEF",
        "accent-150": "#DDE2E4",
        "accent-200": "#CCD1D2",
        "accent-300": "#B0B2B3",
        "accent-400": "#99A2A5",
        "accent-600": "#667479",
        "accent-700": "#373B3E",
        "accent-800": "#242B33",
        "accent-900": "#212529",
      },
      spacing: {
        navbar: "4.125rem",
        sidebar: "16.8125rem",
        "sidebar-padding": "18.3125rem",
      },
    },
  },
  plugins: [],
};
