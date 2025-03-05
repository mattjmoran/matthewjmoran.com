<script lang="ts">
	import { fade } from 'svelte/transition';
	import animate from '$lib/utils/animate.svelte';
	import Icon from '$lib/components/Icon.svelte';

	let { loading }: { loading: boolean } = $props();

	const loadingIcons = ['computer', 'compass', 'lightbulb'];

	let transitionDuration = animate.delay * 0.1;
	let transitionDelay = animate.delay * 0.9;
</script>

{#if loading}
	<div class="loading" transition:fade={{ duration: transitionDuration, delay: transitionDelay }}>
		{#each loadingIcons as icon, index}
			<div class="icon" style="animation-delay: {200 * index}ms">
				<Icon name={icon} size="100px" fill="#fff" />
			</div>
		{/each}
	</div>
{/if}

<style lang="postcss">
	@import '$lib/styles/extends.pcss';

	@keyframes switchIcons {
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
		animation: switchIcons 600ms steps(1, end) infinite;
		opacity: 0;
	}

	.icon:nth-of-type(1) {
		opacity: 1;
	}
</style>
