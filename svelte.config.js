import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess([vitePreprocess()]),
	kit: {
		// Recommended options for the SSG using the `@sveltejs/adapter-static`.
		// https://svelte.dev/docs/kit/adapter-static#Usage
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		})
	}
};

export default config;
