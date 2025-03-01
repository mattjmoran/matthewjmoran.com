<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';

	let {
		text,
		icon,
		direction = 'right',
		x = 75
	}: {
		text: string;
		icon: string;
		direction?: 'left' | 'right';
		x?: number;
	} = $props();
</script>

<div
	class="header"
  style={direction === 'left' ? `margin-left: calc(0.${x} * var(--size))` : `margin-right: calc(0.${x} * var(--size))`}
>
	<h1>{text}</h1>
	<div
		class="icon-wrapper {direction}"
		style="transform: translateX({x * (direction === 'right' ? 1 : -1)}%)"
	>
		<Icon name={icon} size="100%" fill="white" />
	</div>
</div>

<style lang="postcss">
	@import '$lib/styles/media-queries.pcss';

	:root {
		--size: 64px;

		@media (--laptop) {
			--size: calc(64px * 0.9)
		}

		@media (--tablet) {
			--size: calc(64px * 0.65)
		}

		@media (--phone) {
			--size: calc(64px * 0.5)
		}
	}

	.header {
		width: fit-content;
		display: inline-block;
		position: relative;
	}

	.icon-wrapper {
		position: absolute;
		bottom: 0px;
		z-index: 1;
		width: var(--size);
		height: var(--size);
	}

	.icon-wrapper.left {
		left: 0px;
		transform: translateY(25%);
	}

	.icon-wrapper.right {
		right: 0px;
		transform: translateY(25%);
	}

	h1 {
		display: inline-block;
		color: white;
		margin: 0;
		font-family: 'Mars Display';
		font-weight: bold;
		font-size: 10rem;
		line-height: 10rem;
		text-transform: capitalize;

		@media (--laptop) {
			font-size: 9rem;
			line-height: 9rem;
		}

		@media (--tablet) {
			font-size: 6.5rem;
			line-height: 6.5rem;
		}

		@media (--phone) {
			font-size: 5rem;
			line-height: 5rem;
		}
	}
</style>
