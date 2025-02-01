<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';

	let { loading }: { loading: boolean } = $props();

	type Square = {
		width: number;
		height: number;
		x: number;
		y: number;
		begin: number;
	};

	const squareSize = 15;
	const borderSize = 5;
	const width = 3 * squareSize + 2 * borderSize;
	const height = 3 * squareSize + 2 * borderSize;
	const dur = 1;
	const order = [
		{ row: 0, col: 1 }, // Top-center
		{ row: 0, col: 2 }, // Top-right
		{ row: 1, col: 2 }, // Middle-right
		{ row: 2, col: 2 }, // Bottom-right
		{ row: 2, col: 1 }, // Bottom-center
		{ row: 2, col: 0 }, // Bottom-left
		{ row: 1, col: 0 }, // Middle-left
		{ row: 0, col: 0 } // Top-left
	];

	const squares: Square[] = [];
	order.forEach((pos, index) => {
		squares.push({
			width: squareSize,
			height: squareSize,
			x: pos.col * (squareSize + borderSize),
			y: pos.row * (squareSize + borderSize),
			begin: -(dur - index * (dur / order.length))
		});
	});
</script>

{#if loading}
	<div transition:slide={{ duration: 1500, delay: 1000, axis: 'x', easing: quintInOut }}>
		<svg
			transition:fade={{ duration: 500, delay: 1000 }}
			{width}
			{height}
			viewBox="0 0 {width} {height}"
			xmlns="http://www.w3.org/2000/svg"
			fill="#fff"
		>
			{#each squares as square}
				<rect {...square} style="animation-delay:{square.begin}s; --dur:{dur}s;" />
			{/each}
		</svg>
	</div>
{/if}

<style>
	div {
		z-index: var(--z-loading);
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
		overflow: hidden;
		background: black;
	}

	@keyframes fade {
		0% {
			fill-opacity: 1;
		}
		50% {
			fill-opacity: 0.25;
		}
		100% {
			fill-opacity: 1;
		}
	}

	rect {
		animation: fade var(--dur) ease-in-out infinite;
	}
</style>
