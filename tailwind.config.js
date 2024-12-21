/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#03071E',     // Deep navy for main backgrounds
          primary: '#370617',  // Rich burgundy for headers
          accent: '#D00000',   // Vibrant red for CTAs
          light: '#FAA307',    // Warm orange for highlights
          muted: '#F6F8FA',    // Light gray for backgrounds
          text: {
            dark: '#1F2937',   // Dark gray for main text
            light: '#F3F4F6',  // Light gray for text on dark backgrounds
          }
        }
      }
    }
  },
  plugins: [],
}

