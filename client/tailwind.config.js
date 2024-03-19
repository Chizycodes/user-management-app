/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const daisyui = require("daisyui");
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			// colors: {
			// 	primary: '#7862F8',
			// },
		},
	},
	plugins: [daisyui],
	daisyui: {
		themes: ['light'],
	},
};
