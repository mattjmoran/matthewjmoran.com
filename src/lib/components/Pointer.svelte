<script lang="ts">
	import { Spring } from 'svelte/motion';
	import { scale } from 'svelte/transition';

	let pointer = $state(
		new Spring(
			{ x: 0, y: 0 },
			{
				stiffness: 0.1,
				damping: 0.5
			}
		)
	);
	let visible = $state(false);

	const norm = (val: number, max: number, min: number) => (val - min) / (max - min);
	let hypot = $derived(
		Math.hypot(pointer.current.x - pointer.target.x, pointer.current.y - pointer.target.y)
	);
	let border = $derived(6 * Math.max(1 - norm(hypot, 100, 0), 0) + 2);

	const onmousemove = (event: { pageX: number; pageY: number }) => {
		visible = true;
		pointer.target = { x: event.pageX, y: event.pageY };
	};
	const onscroll = () => (visible = false);
	const onmouseleave = () => (visible = false);
</script>

<svelte:window {onscroll} />
<svelte:body {onmousemove} {onmouseleave} />

{#if visible}
	<div
		transition:scale={{ duration: 500 }}
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
</style>
