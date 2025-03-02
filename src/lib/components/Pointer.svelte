<script lang="ts">
	// Import Dependencies
	import { Spring } from 'svelte/motion';
	import { scale } from 'svelte/transition';
	import pointer from '$lib/utils/pointer.svelte';

	// Reactive State Variables
	let isVisible = $state(false);
	let isHovering = $state(false);

	let follower = $state(
		new Spring(
			{ x: 0, y: 0 },
			{ stiffness: 0.1, damping: 0.5 }
		)
	);

	// Utility Functions
	const normalize = (value: number, max: number, min: number) => (value - min) / (max - min);

	// Derived Values
	let distance = $derived( 
		Math.hypot(follower.current.x - follower.target.x, follower.current.y - follower.target.y)
	);

	let borderWidth = $derived( 
		6 * Math.max(1 - normalize(distance, 100, 0), 0) + 2
	);

	// Event Handlers
	const onpointermove = (event: PointerEvent) => {
		const { pointerType, pageX, pageY, target } = event;
		pointer.x = pageX;
		pointer.y = pageY;
		pointer.type = pointerType;

		if (pointerType === 'mouse') {
			follower.target = { x: pageX, y: pageY };
			isVisible = true;
			if (target && target instanceof Element) {
				const cursor = getComputedStyle(target).cursor;
				isHovering = cursor === 'pointer' || cursor === 'auto';
			}
		}
	};

	const onscroll = () => (isVisible = false);
	const onpointerleave = () => (isVisible = false);
</script>


<svelte:window {onscroll} />
<svelte:body {onpointermove} {onpointerleave} />

{#if isVisible}
	<div
		transition:scale={{ duration: 500 }}
		class:hover={isHovering}
		style="left:{follower.current.x}px; top:{follower.current.y}px; border-width:{borderWidth}px"
	></div>
{/if}

<style>
	div {
		--size: 40px;
		width: var(--size);
		height: var(--size);
		position: absolute;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		border-style: solid;
		border-color: var(--green);
		pointer-events: none;
		z-index: var(--z-pointer);
		will-change: left, top, border-width;
	}

	@keyframes rotating {
		from {
			transform: translate(-50%, -50%) rotate(0deg);
		}
		to {
			transform: translate(-50%, -50%) rotate(360deg);
		}
	}

	.hover {
		animation: rotating 3s linear infinite;
		border-style: dashed;
		border-width: 3px !important;
	}
</style>
