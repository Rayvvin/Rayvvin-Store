import {nextui} from "@nextui-org/react";
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      transitionProperty: {
        "width": "width",
        "spacing": 'margin, padding',
      },
      maxWidth: {
        "8xl": "100rem",
      },
      boxShadow: {
        'card': 'rgba(0, 0, 0, 0.06) 0px 2px 10px',
      },
      screens: {
        "2xsmall": "320px",
        "xsmall": "512px",
        "small": "1024px",
        "medium": "1280px",
        "large": "1440px",
        "xlarge": "1680px",
        "2xlarge": "1920px",
      },
      // fontFamily: {
      //   sans: [
      //     "Inter",
      //     "-apple-system",
      //     "BlinkMacSystemFont",
      //     "Segoe UI",
      //     "Roboto",
      //     "Helvetica Neue",
      //     "Ubuntu",
      //     "sans-serif",
      //   ],
      // },
      colors: {
        primary: '#344F16',     // Dark Green
        secondary: '#E48629',   // Orange
        accent: '#371409',      // Dark Brown
        background: '#FFFFFF',  // White
      },
      fontFamily: {
        heading: ['Arlon', 'sans-serif'],
        body: ['Comfortaa', 'sans-serif'],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    // require('flowbite/plugin')
  ],
}
