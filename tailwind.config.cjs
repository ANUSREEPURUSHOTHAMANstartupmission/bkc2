/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
		screens: {
			sm: '30rem', // 480px
			md: '45rem', // 720px
			lg: '60rem', // 960px
			xl: '75rem', // 1200px
		},
	},
	plugins: [
		require('tailwindcss-scoped-groups'),
		require('flowbite/plugin'),
		require('@tailwindcss/line-clamp'),
	],
}
