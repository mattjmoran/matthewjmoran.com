<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import hash from '$lib/utils/hash';

	let innerWidth = $state(0);

	const seed = Math.random();

	let transitionDiv = $state({
		width: 1,
		height: 1
	});
	let transitionSvg = $derived({
		height: Math.ceil(transitionDiv.height / 50),
		width: Math.ceil(
			(transitionDiv.width * Math.ceil(transitionDiv.height / 50)) / transitionDiv.height
		)
	});
	let transitionRepeat = $derived({
		x: [...Array(transitionSvg.width).keys()],
		y: [...Array(transitionSvg.height).keys()]
	});

	let time: string | undefined = $state();

	onMount(() => {
		const interval = setInterval(
			() =>
				(time = new Intl.DateTimeFormat('en-US', {
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
					hourCycle: 'h23',
					timeZone: 'America/Chicago'
				}).format(new Date())),
			1000
		);
		return () => clearInterval(interval);
	});
</script>

<svelte:window bind:innerWidth={innerWidth} />

<div id="intro">
	<div class="content">
		<div class="navigation">
			<ul>
				<li>
					<Icon name="click" size={32} fill="black" />
				</li>
				<li>
					<a href="/#resume">Resume</a>
				</li>
				<li>
					<a href="/#resume">Projects</a>
				</li>
				<li>
					<a href="/#resume">About</a>
				</li>
			</ul>
		</div>
		<div class="title">
			{#if innerWidth >= 768}
				<h1 style="justify-content: left;">Matthew</h1>
				<h1 style="justify-content: right;">J. Moran</h1>
			{:else}
				<h1 style="justify-content: left;">M</h1>
				<h1 style="justify-content: center;">J</h1>
				<h1 style="justify-content: right;">M</h1>
			{/if}
		</div>
		<div class="subtext">
			<div class="scroll">
				<p>Scroll<br />for more</p>
				<div>
					<Icon name="mouse" size="100%" fill="var(--light-gray)" />
				</div>
			</div>
			<div class="time">
				<p>Chicago {time}</p>
			</div>
		</div>
	</div>
	<div
		class="transition"
		bind:clientWidth={transitionDiv.width}
		bind:clientHeight={transitionDiv.height}
	>
		<svg viewBox="0 0 {transitionSvg.width} {transitionSvg.height}">
			{#each transitionRepeat.x as x}
				{#each transitionRepeat.y as y}
					{#if hash((y + 1) * (x + 1), seed) < (y + 1) / (transitionSvg.height + 1)}
						<rect {x} {y} width="1" height="1" shape-rendering="crispEdges" />
					{/if}
				{/each}
			{/each}
		</svg>
	</div>
</div>

<div id="resume">
	<Header text="Updating" icon="crane" direction="right" />
</div>

<style lang="postcss">
	@import '$lib/styles/media-queries.pcss';
	@import '$lib/styles/extends.pcss';

	:root {
		--border-margin: 10px;
		--title-height-percent: 0.75;
		--transition-height: max(25vh, 100px);
		--transition-speed: 250ms;
	}

	#intro {
		position: relative;	
		margin: var(--border-margin) var(--border-margin) 0 var(--border-margin);
		min-height: calc(100vh - var(--border-margin) * 2 + var(--transition-height));
		border-image: url('$lib/assets/grid-background.svg') 80 fill / 80px round;
		&::before {
			content: '';
			position: absolute;
			inset: 0;
			backdrop-filter: blur(4px);
			mask-image: linear-gradient(to bottom, transparent 0%, black 60%, black 100%);
		}
	}

	#intro .content {
		@extend %flex-column;
		padding: 60px;
		position: relative;
		min-height: calc(100vh - var(--border-margin));
		@media (--phone) {
			padding: 40px;
		}
	}

	#intro .navigation {
		@extend %flex-column;
		justify-content: flex-start;
		align-items: flex-end;
		text-align: right;
		flex: 1;
		& ul {
			@extend %no-space;
			list-style-type: none;
			&:hover {
				& li a {
					color: var(--light-gray);
				}
				& li:nth-child(1) {
					transform: translate(0, 5px);
				}
			}
		}
		& ul li {
			font: 1.5rem 'AUTHENTIC Sans';
			margin: 5px 0;
			text-transform: capitalize;
			transition: transform ease var(--transition-speed);
			& a {
				color: black;
				background: linear-gradient(to bottom, var(--light-green) 0%, var(--light-green) 100%) repeat-x 0 100% / 4px 4px;
				text-decoration: none;
				transition: background-size ease var(--transition-speed), color ease var(--transition-speed);
					&:hover {
					color: black;
					background-size: 4px 100%;
				}
			}
		}
		@media (--tablet), (--phone) {
			align-items: center;
			& ul {
				@extend %flex-row;
				justify-content: center;
				align-items: flex-start;
				gap: 15px;
			}
			& ul li {
				font-size: 1.25rem;
				&:nth-child(1) {
					display: none;
				}
			}
		}
	}

	#intro .title {
		@extend %flex-column;
		justify-content: center;
		flex: 1;
		& h1 {
			@extend %no-space, %flex-center;
			font: bold 13rem/1 'Mars Display';
			height: calc(13rem * var(--title-height-percent));
			user-select: none;
			@media (--laptop) {
				font-size: 10rem;
				height: calc(10rem * var(--title-height-percent));
			}
			@media (--tablet), (--phone) {
				font-size: 12rem;
				height: calc(12rem * var(--title-height-percent));
			}
		}
	}

	#intro .subtext {
		@extend %flex-row;
		justify-content: space-between;
		align-items: flex-end;
		flex: 1;
		& p {
			@extend %no-space;
			font: 1.25rem/100% 'jgs_font';
			color: var(--light-gray);
			text-transform: uppercase;
		}
		@media (--phone) {
			& p {
				font-size: 1rem;
			}
		}
	}

	#intro .scroll {
		@extend %flex-column;
		gap: 10px;
		& div {
			width: 64px;
			height: 64px;
		}
		@media (--tablet), (--phone) {
			@extend %flex-row;
			flex-direction: row-reverse;
			align-items: flex-end;
			& div {
				width: 48px;
				height: 48px;
			}
		}
	}

	#intro .time {
		text-align: right;
	}

	#intro .transition {
		position: relative;
		left: calc(-1 * var(--border-margin));
		width: calc(100% + var(--border-margin) * 2);
		height: var(--transition-height);
		& svg {
			position: absolute;
			bottom: -1px;
			width: 100%;
			fill: black;
		}
	}

	#resume {
		@extend %flex-column;
		padding: 70px;
		background-color: black;
		align-items: center;
	}
</style>