<script lang="ts">
	import { Spring } from 'svelte/motion';
	import { scale } from 'svelte/transition';

	let isVisible = $state(false);
	let isHover = $state(false);
	let pointer = $state(
		new Spring(
			{ x: 0, y: 0 },
			{
				stiffness: 0.1,
				damping: 0.5
			}
		)
	);

	const norm = (val: number, max: number, min: number) => (val - min) / (max - min);
	let hypot = $derived(
		Math.hypot(pointer.current.x - pointer.target.x, pointer.current.y - pointer.target.y)
	);

	let border = $derived(6 * Math.max(1 - norm(hypot, 100, 0), 0) + 2);

	const onpointermove = (event: { pointerType: string; pageX: number; pageY: number; target: EventTarget | null }) => {
		if (event.pointerType == 'mouse') {
			pointer.target = { x: event.pageX, y: event.pageY };
			isVisible = true;
			if (event.target instanceof Element) {
				const tagName = event.target.tagName.toLowerCase();
				isVisible = !['p'].includes(tagName);
				isHover = ['a', 'button'].includes(tagName);
			}
		} else {
			isVisible = false;
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
		class:hover={isHover}
		style="left:{pointer.current.x}px; top:{pointer.current.y}px; border-width:{border}px"
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
