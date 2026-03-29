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
		extend: {
			colors: {
				primary: {
					DEFAULT: "#006565",
					container: "#008080",
				},
				surface: {
					DEFAULT: "#fcf9f8",
					container: {
						low: "#f6f3f2",
						highest: "#e5e2e1",
						lowest: "#ffffff",
					},
					dim: "#dcd9d9",
				},
				"on-surface": {
					DEFAULT: "#1c1b1b",
					variant: "#4a4646",
				},
				outline: {
					variant: "#1c1b1b26", // 15% opacity
				},
				charcoal: "#1A1A1A",
			},
			fontFamily: {
				manrope: ["Manrope", "sans-serif"],
				inter: ["Inter", "sans-serif"],
			},
			borderRadius: {
				xl: "1.5rem", // 24px per design spec
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
}

