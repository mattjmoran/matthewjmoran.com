<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import hash from '$lib/utils/hash';

	// Section 1 of 4: Introduction
	const seed = Math.random();
	let transitionDiv = $state({ 
		width: 1, 
		height: 1
	});
	let transitionSvg = $derived({
		height: Math.ceil(transitionDiv.height / 50),
		width: Math.ceil((transitionDiv.width * Math.ceil(transitionDiv.height / 50)) / transitionDiv.height)
	});
	let transitionRepeat = $derived({
		x: [...Array(transitionSvg.width).keys()],
		y: [...Array(transitionSvg.height).keys()]
	});
</script>

<!-- Section 1 of 4: Introduction -->
<div id="section-1">
	<div class="content">
		<h1>Matthew <br />J. Moran</h1>
		<p>
			This website was created with SvelteKit's static site generator and is hosted on Cloudflare
			Pages.
		</p>
	</div>
	<div class="transition" bind:clientWidth={transitionDiv.width} bind:clientHeight={transitionDiv.height}>
		<svg viewBox="0 0 {transitionSvg.width} {transitionSvg.height}">
			{#each transitionRepeat.x as x}
				{#each transitionRepeat.y as y}
					{#if hash((y + 1) * (x + 1), seed) < (y + 1) / (transitionSvg.height + 1)}
						<rect {x} {y} width="1" height="1" />
					{/if}
				{/each}
			{/each}
		</svg>
	</div>
</div>

<!-- Section 2 of 4: Resume -->
<div id="section-2">
	<div class="content">
		<Header text="Updating" icon="crane" direction="right" />
	</div>
</div>

<style lang="postcss">
	@import '$lib/styles/media-queries.pcss';

	/* Section 1 of 4: Introduction */
	#section-1 {
		/* Variables */
		--border-margin: 10px;
		--transition-height: max(25vh, 100px);

		/* Margin and border */
		margin: var(--border-margin) var(--border-margin) 0 var(--border-margin);
		border-image: url('$lib/assets/grid-background.svg') 80 fill / 80px round;

		/* Position and size */
		position: relative;
		width: calc(100vw - var(--border-margin) * 2);
		min-height: calc(100vh - var(--border-margin) * 2 + var(--transition-height));

		/* Color */
		background-color: white;

		&::before {
			/* Required for pseudo-elements */
			content: '';

			/* Position and size */
			position: absolute;
			width: 100%;
			height: 100%;

			/* Top-down blur gradient */
			backdrop-filter: blur(4px);
			mask-image: linear-gradient(to top, black 33%, transparent 100%);
		}
		& .content {
			/* Position and size */
			position: relative;
			width: 100%;
			min-height: calc(100vh - var(--border-margin));

			/* Padding for content */
			padding: 60px;

			/* Start of temporary styles (centered content) */
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			/* End of temporary styles (centered content) */
		}

		& .transition {
			/* Position and size */
			position: relative;
			left: calc(-1 * var(--border-margin));
			width: calc(100% + var(--border-margin) * 2);
			height: var(--transition-height);

			& svg {
				/* Position and size */
				position: absolute;
				bottom: -1px;
				width: 100%;

				/* Layout */
				display: block;

				/* Color */
				fill: black;
			}
		}

		/* Start of temporary styles (typography) */
		h1 {
			font-family: 'Mars Display';
			font-weight: bold;
			font-size: 9rem;
			line-height: 9rem;

			@media (--laptop) {
				font-size: 7rem;
				line-height: 7rem;
			}

			@media (--tablet) {
				font-size: 5rem;
				line-height: 5rem;
			}

			@media (--phone) {
				font-size: 4rem;
				line-height: 4rem;
			}
		}

		p {
			font-family: 'jgs_font';
			text-align: center;
			text-transform: uppercase;
			color: var(--light-gray);
			font-size: 1rem;

			@media (--tablet) {
				font-size: 0.875rem;
			}

			@media (--phone) {
				font-size: 0.75rem;
			}
		}
		/* End of temporary styles (typography) */
	}

	/* Section 2 of 4: Resume */
	#section-2 {
		/* Variables */
		--content-width: 1000px;

		/* Position and size */
		padding: 70px;

		/* Color */
		background-color: black;

		& .content {
			/* Position and size */
			height: 100%;
			width: 100%;
			max-width: var(--content-width);
			margin: 0 auto;

			/* Temporary  styles (flex layout) */
			display: flex;
			flex-direction: column;
			align-items: center;
			/* End of temporary styles (flex layout) */
		}
	}
</style>
