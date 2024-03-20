/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

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
