<script lang="ts">
	// Import Dependencies
	import { onMount } from 'svelte';

	// Custom Utilities
	import animate from '$lib/utils/animate.svelte';

	// Components
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

	// Once the component is mounted, set the loading state to false
	// and trigger the animations after a delay.
	let loading = $state(true);
	onMount(() => {
		loading = false;
		setTimeout(() => {
			animate.trigger = true;
		}, animate.delay);
	});
</script>

<svelte:head>
	<title>Matthew J. Moran</title>
</svelte:head>

<Loading {loading} />
<Pointer />

{@render children()}
