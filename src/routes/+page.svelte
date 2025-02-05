<script lang="ts">
	import { onMount } from 'svelte';
	import FountainPen from '$lib/assets/fountain-pen.png';
	import Header from '$lib/components/Header.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import hash from '$lib/utils/hash';

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

<div id="intro">
	<div class="content">
		<div class="marquee"></div>
		<div class="navigation">
			<ul>
				<li>
					<Icon name="click" size={32} fill="black" />
				</li>
				<li>
					<a href="/#resume">Resume</a>
				</li>
				<li>
					<a href="/">Projects</a>
				</li>
				<li>
					<a href="/">About</a>
				</li>
			</ul>
			<img src={FountainPen} alt="Fountain Pen" />
		</div>
		<div class="title">
			<div class="header">
				<h1>Matthew<br />J. Moran</h1>
				<div class="scroll">
					<p>Scroll<br />for more</p>
					<div>
						<Icon name="mouse" size="100%" fill="var(--light-gray)" />
					</div>
				</div>
			</div>
			<div>
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
						<rect {x} {y} width="1" height="1" />
					{/if}
				{/each}
			{/each}
		</svg>
	</div>
</div>

<div id="resume">
	<div class="content">
		<Header text="Updating" icon="crane" direction="right" />
	</div>
</div>

<style lang="postcss">
	@import '$lib/styles/media-queries.pcss';
	@import '$lib/styles/extends.pcss';

	:root {
		--border-margin: 10px;
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
			mask-image: linear-gradient(to top, black 33%, transparent 100%);
			@media (--tablet), (--phone) {
				mask-image: linear-gradient(to bottom, black 33%, transparent 100%);
			}
		}
	}

	#intro .content {
		@extend %flex-column;
		padding: 60px;
		position: relative;
		min-height: calc(100vh - var(--border-margin));
		@media (--tablet), (--phone) {
			flex-direction: column-reverse;
			padding: 40px;
		}
	}

	#intro .content .marquee {
		flex: 1;
	}

	#intro .content .navigation {
		@extend %flex-column;
		justify-content: flex-end;
		align-items: flex-end;
		text-align: right;
		flex: 1;
		& ul {
			@extend %no-space;
			list-style-type: none;
		}
		& li {
			font: 2rem 'AUTHENTIC Sans';
			margin: 5px 0;
			text-transform: capitalize;
			&:nth-child(1) {
				transition: transform ease var(--transition-speed);
				&:hover {
					transform: translate(0, 10px);
				}
			}
		}
		& a {
			color: black;
			background: linear-gradient(to bottom, var(--light-green) 0%, var(--light-green) 100%) repeat-x 0 100% / 4px 4px;
			text-decoration: none;
			transition: background-size ease var(--transition-speed);
			&:hover {
				background-size: 4px 100%;
			}
		}
		& img {
			position: relative;
			transform-origin: center;
			transform: rotate(20deg);
			width: min(850px, 75vw);
			top: min(10px, 1vw);
			left: min(300px, 25vw);
			filter: drop-shadow(15px 10px 5px rgb(0 0 0 / 50%));
			user-select: none;
			transition: transform ease var(--transition-speed);
		}
		@media (--laptop) {
			& img {
				transform: rotate(15deg);
			}
		}
		@media (--tablet), (--phone) {
			@extend %flex-center;
			text-align: center;
			& img {
				display: none;
			}
		}
	}

	#intro .content .title {
		@extend %flex-row;
		justify-content: space-between;
		align-items: flex-end;
		& p {
			@extend %no-space;
			font: 1.25rem/100% 'jgs_font';
			color: var(--light-gray);
			text-transform: uppercase;
		}
		@media (--tablet), (--phone) {
			@extend %flex-center;
			flex-direction: column-reverse;
			flex: 1;
		}
	}

	#intro .content .title .header {
		@extend %flex-row;
		align-items: flex-end;
		gap: 10px;
		& h1 {
			@extend %no-space;
			font: bold 9rem/100% 'Mars Display';
			@media (--laptop) {
				font-size: 6rem;
			}
			@media (--tablet) {
				font-size: 5rem;
			}
			@media (--phone) {
				font-size: 4rem;
			}
		}
		@media (--tablet), (--phone) {
			@extend %flex-column;
			align-items: center;
			& h1 {
				margin: 10px;
			}
		}
	}

	#intro .content .title .header .scroll {
		@extend %flex-column;
		gap: 10px;
		& div {
			width: 64px;
			height: 64px;
		}
		@media (--tablet), (--phone) {
			@extend %flex-row;
			align-items: center;
			& p {
				text-align: right;
			}
			& div {
				width: 48px;
				height: 48px;
			}
		}
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
		padding: 70px;
		background-color: black;
	}

	#resume .content {
		@extend %flex-column;
		align-items: center;
	}
</style>