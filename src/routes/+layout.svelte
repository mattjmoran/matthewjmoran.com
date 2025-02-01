<script lang="ts">
	import { onMount } from 'svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Pointer from '$lib/components/Pointer.svelte';

	// Global CSS styles should be in their own files and imported directly in JS
	// to take advantage of Vite's own style processing.
	// https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/faq.md
	import 'sanitize.css';
	import '$lib/styles/global.pcss';

	// Component must include a `@render` tag for the page content.
	// https://svelte.dev/docs/kit/routing#layout-layout.sveltes
	let { children } = $props();

	let loading = $state(true);
	onMount(() => (loading = false));
</script>

<Loading {loading} />
<Pointer />

{@render children()}
