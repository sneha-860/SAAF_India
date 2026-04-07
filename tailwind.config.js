/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        saaf: {
          teal: "#0F6E56",
          sage: "#5DCAA5",
          amber: "#EF9F27",
          coral: "#F0997B",
          mint: "#E1F5EE",
          deepgreen: "#0B513F",
          offwhite: "#F6F2EB"
        }
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 24px 60px rgba(15, 110, 86, 0.08)"
      },
      backgroundImage: {
        leafy: "radial-gradient(circle at top left, rgba(93, 202, 165, 0.15), transparent 35%), radial-gradient(circle at bottom right, rgba(239, 146, 39, 0.1), transparent 30%)"
      }
    }
  },
  plugins: []
}
