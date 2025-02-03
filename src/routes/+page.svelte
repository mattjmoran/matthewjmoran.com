<script lang="ts">
	import { onMount } from 'svelte';
	import FountainPen from '$lib/assets/fountain-pen.png'
	import Header from '$lib/components/Header.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import hash from '$lib/utils/hash';

	// Section 1 of 4: Introduction

	// Section 1: Time
	let time: string | undefined = $state();

	// Section 1: Transition
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

	// Lifecycle Hooks
  onMount(() => {
    const interval = setInterval(() =>
			time = new Intl.DateTimeFormat('en-US', {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hourCycle: 'h23',
				timeZone: 'America/Chicago'
			}).format(new Date())
		, 1000);
    return () => clearInterval(interval);
  });
</script>

<!-- Section 1 of 4: Introduction -->
<div id="section-1">
	<div class="content">
		<div class="top"></div>
		<div class="middle">
			<ul>
				<li class="click">
					<Icon name="click" size={32} fill="black" />
				</li>
				<li>
					<a href="/">Resume</a>
				</li>
				<li>
					<a href="/">Projects</a>
				</li>
				<li>
					<a href="/">About</a>
				</li>
			</ul> 
			<img src={FountainPen} alt="Fountain Pen">
		</div>
		<div class="bottom">
			<div class="bottom-left">
				<h1>Matthew<br />J. Moran</h1>
				<div>
					<p>Scroll<br />for more</p>
					<div>
						<Icon name="mouse" size="100%" fill="var(--light-gray)" />
					</div>
				</div>
			</div>
			<div class="bottom-right">
				<p>Chicago {time}</p>
			</div>
		</div>
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
			display: flex;
			flex-direction: column;

			/* Padding for content */
			padding: 60px;
			@media (--tablet), (--phone) {
				padding: 40px;
				flex-direction: column-reverse;
			}
			& .top {
				/* Position and size */
				flex: 1;
			}
			& .middle {
				/* Position and size */
				flex: 1;
				display: flex;
				justify-content: flex-end; 
				align-items: flex-end;
				flex-direction: column;
				text-align: right;

				& ul {
					padding: 0;
					margin: 0;
				}

				& .click {
					transition: transform ease 250ms;
					&:hover {
						transform: translate(0, 10px);
					}
				}

				/* Navigation menu */
				& li {
					font-family: 'AUTHENTIC Sans';
					font-size: 2rem;
					line-height: 2.75rem;
					list-style-type: none;
					text-transform: capitalize;
					margin: 0;

					& a {
						background:
						linear-gradient(
							to bottom,
							var(--light-green) 0%,
							var(--light-green) 100%
						);
						background-position: 0 100%;
						background-repeat: repeat-x;
						background-size: 4px 4px;
						color: #000;
						text-decoration: none;
						transition: background-size ease 250ms;

						&:hover {
							background-size: 4px 2.75rem;
						}
					}
				}

				& img {
					position: relative;
					transform-origin: center;
					transform: rotate(20deg);
					filter: drop-shadow(15px 10px 5px rgb(0 0 0 / 50%));
					width: min(850px, 75vw);
					top: min(10px, 1vw);
					left: min(300px, 25vw);
					user-select: none;
					transition: transform ease 250ms;

					&:hover {
						transform: rotate(10deg);
					}

					@media (--laptop) {
						transform: rotate(15deg);
						width: 75vw;
					}

					@media (--tablet), (--phone) {
						display: none;
					}
				}

				@media (--tablet), (--phone) {
					text-align: center;
					align-items: center;
					justify-content: center;
				}
			}

			& .bottom {
				/* Position and size */
				flex: 0 1 auto;
				display: flex;
				justify-content: space-between;
				align-items: flex-end;

				/* Typography */
				& p {
					font-family: 'jgs_font';
					color: var(--light-gray);
					font-size: 1.25rem;
					line-height: 1.25rem;
					text-transform: uppercase;
					margin: 0;
				}

				& .bottom-left {
					/* Position and size */
					display: flex;
					flex-direction: row;
					align-items: flex-end;

					/* Typography */
					& h1 {
						font-family: 'Mars Display';
						font-weight: bold;
						font-size: 9rem;
						line-height: 9rem;
						margin: 0;
						margin-right: 20px;
						@media (--laptop) {
							font-size: 6rem;
							line-height: 6rem;
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

					/* Scroll information container */
					& div {
						/* Position and size */
						display: flex;
						flex-direction: column;
						align-items: flex-start;

						/* Margin for content */
						margin-bottom: 20px;
						@media (--laptop) {
							margin-bottom: 10px;
						}

						& p {
							margin-bottom: 10px; 
						}

						/* Icon */
						& div {
							width: 64px;
							height: 64px;
							margin: 0;
						}
					}

					/* Adjust positioning and margins for mobile */
					@media (--tablet), (--phone) {
						flex-direction: column;
						align-items: center;
						& h1 {
							margin-right: 0;
							margin-bottom: 10px;
						}
						& div {
							display: flex;
							flex-direction: row;
							align-items: center;
							margin-bottom: 0px;
							& p {
								margin-bottom: 0; 
								margin-right: 10px;
							}
							& div {
								width: 48px;
								height: 48px;
							}
						}
					}
				}

				& .bottom-right {
					text-align: right;
				}

				/* Adjust positioning and content for mobile */
				@media (--tablet), (--phone) {
					flex: 1;
					align-items: center;
					justify-content: center;

					& .bottom-right {
						display: none;
					}
				}
			}
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
