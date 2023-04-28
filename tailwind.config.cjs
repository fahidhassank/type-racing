/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				transparent: "transparent",
				current: "currentColor",
				white: "#ffffff",
				purple: "#3f3cbb",
				midnight: "#121063",
				metal: "#565584",
				tahiti: "#3ab7bf",
				silver: "#ecebff",
				"bubble-gum": "#ff77e9",
				bermuda: "#78dcca",
				"custom-dark": "#161b21",
				"custom-green": "#15e8d8",
				"custom-secondary": "#1f272f",
			},
			fontFamily: {
				nunito: "Nunito, sans-serif",
			},
			borderRadius: {
				large: "2.5rem",
			},
			gridTemplateRows: {
				10: "repeat(10, minmax(0, 1fr))",
				12: "repeat(12, minmax(0, 1fr))",
			},
		},
	},
	plugins: [],
}
