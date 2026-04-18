/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // ここにはNativeWindのTailwind用プリセットを指定します
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
