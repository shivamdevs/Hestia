/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
	],
	presets: [require("nativewind/preset")],
	future: {
		hoverOnlyWhenSupported: true,
	},
	theme: {
		extend: {},
	},
	plugins: [require("tailwindcss-animate")],
}

