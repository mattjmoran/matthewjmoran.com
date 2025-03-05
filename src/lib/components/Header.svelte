<script lang="ts">
	// Components
	import Icon from '$lib/components/Icon.svelte';

	// Props
	let {
		text,
		icon,
		direction = 'right',
		shift = '75%'
	}: {
		text: string;
		icon: string;
		direction?: 'left' | 'right';
		shift?: string;
	} = $props();
</script>

<div
	class="header"
  style={
	direction === 'left' 
		? `margin-left: calc(${shift} * var(--icon-size))` 
		: `margin-right: calc(${shift} * var(--icon-size))`
	}
>
	<h1>{text}</h1>
	<div
		class="icon-wrapper {direction}"
		style="transform: translateX(calc({shift} * {(direction === 'right' ? 1 : -1)})"
	>
		<Icon name={icon} size="100%" fill="white" />
	</div>
</div>

<style lang="postcss">
	@import '$lib/styles/media-queries.pcss';

	:root {
		--icon-size: 64px;
		--font-size: 10rem;

		@media (--laptop) {
			--mult: 0.9;
			--icon-size: calc(64px * var(--mult));
			--font-size: calc(10rem * var(--mult));
		}

		@media (--tablet) {
			--mult: 0.8;
			--icon-size: calc(64px * var(--mult));
			--font-size: calc(10rem * var(--mult));
		}

		@media (--phone) {
			--mult: 0.5;
			--icon-size: calc(64px * var(--mult));
			--font-size: calc(10rem * var(--mult));
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
		width: var(--icon-size);
		height: var(--icon-size);
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
		font-size: var(--font-size);
		line-height: var(--font-size);
		text-transform: capitalize;
	}
</style>
