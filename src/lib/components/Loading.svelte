<script lang="ts">
	// Import Dependencies
	import { fade } from 'svelte/transition';

	// Custom Utilities
	import animate from '$lib/utils/animate.svelte';

	// Components
	import Icon from '$lib/components/Icon.svelte';

	// Props
	let {
		loading
	}: {
		loading: boolean;
	} = $props();

	// Loading Animation Settings
	const loadingIcons = ['computer', 'compass', 'lightbulb'];
	const loadingDuration = animate.delay * 0.1;
	const loadingDelay = animate.delay * 0.9;
	const loadingParams = { duration: loadingDuration, delay: loadingDelay };
</script>

{#if loading}
	<div class="loading" transition:fade={loadingParams}>
		{#each loadingIcons as icon, index (icon)}
			<div class="icon" style="animation-delay: {200 * index}ms">
				<Icon name={icon} size="100px" fill="#fff" />
			</div>
		{/each}
	</div>
{/if}

<style lang="postcss">
	@import '$lib/styles/extends.pcss';

	@keyframes iconLoop {
		0% {
			opacity: 1;
		}
		33% {
			opacity: 0;
		}
		66% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	.loading {
		@extend %flex-center;
		z-index: var(--z-loading);
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: black;
	}

	.icon {
		position: absolute;
		animation: iconLoop 600ms steps(1, end) infinite;
		opacity: 0;
	}

	.icon:nth-of-type(1) {
		opacity: 1;
	}
</style>
