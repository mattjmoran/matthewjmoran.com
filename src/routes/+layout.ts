// Required to be set to `true` for SSG.
// https://svelte.dev/docs/kit/adapter-static
export const prerender = true;

// If your host renders `/a.html` upon receiving a request for `/a` then you
// will can set `trailingSlash: 'never'` in your root layout.
// https://svelte.dev/docs/kit/adapter-static
// https://developers.cloudflare.com/pages/configuration/serving-pages
export const trailingSlash = 'never';
