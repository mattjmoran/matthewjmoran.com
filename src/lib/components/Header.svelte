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

<div class="header">
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

	.header {
		width: fit-content;
		display: inline-block;
		position: relative;
	}

	.icon-wrapper {
		position: absolute;
		bottom: 0px;
		z-index: 1;

		--size: 64px;
		width: var(--size);
		height: var(--size);

		@media (--laptop) {
			width: calc(var(--size) * 0.8);
			height: calc(var(--size) * 0.8);
		}

		@media (--tablet) {
			width: calc(var(--size) * 0.6);
			height: calc(var(--size) * 0.6);
		}

		@media (--phone) {
			width: calc(var(--size) * 0.4);
			height: calc(var(--size) * 0.4);
		}
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
		color: var(--dark-gray);
		margin: 0;
		font-family: 'Mars Display';
		font-weight: bold;
		font-size: 10rem;
		line-height: 10rem;
		text-transform: capitalize;

		@media (--laptop) {
			font-size: 8rem;
			line-height: 8rem;
		}

		@media (--tablet) {
			font-size: 6rem;
			line-height: 6rem;
		}

		@media (--phone) {
			font-size: 4rem;
			line-height: 4rem;
		}
	}
</style>
