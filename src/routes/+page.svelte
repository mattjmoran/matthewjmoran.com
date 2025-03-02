<script lang="ts">
	// Import Dependencies
	import { blur, fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import { Spring } from 'svelte/motion';
	import { onMount } from 'svelte';
	
	// Custom Utilities
	import animate from '$lib/utils/animate.svelte';
	import pointer from '$lib/utils/pointer.svelte';
	import hash from '$lib/utils/hash';

	// Components
	import Header from '$lib/components/Header.svelte';
	import Icon from '$lib/components/Icon.svelte';

	// Animation Parameters
	const animationParams = {
		title: (order: number) => ({
			duration: 500,
			delay: order * 50,
			y: 25,
			easing: backOut
		}),
		line: { duration: 1000 }
	};

	// Title & Line Motion Effect
	let innerWidth = $state(0);
	let innerHeight = $state(0);
	const smoothMotion = $state(new Spring({ x: 0, y: 0 }));

	$effect(() => {
		if (pointer.type !== 'mouse') return;

		const elements = [
			{ selector: '#intro .title', scale: 1, maxOffset: 25 },
			{ selector: '#intro .line', scale: 2, maxOffset: 25, offsetX: '-50%' }
		];

		elements.forEach(({ selector, scale, maxOffset, offsetX = '0px' }) => {
			const element = document.querySelector(selector) as HTMLElement | SVGSVGElement;
			if (!element) return;

			const { left, top, width, height } = element.getBoundingClientRect();
			let offsetXValue = (((pointer.x - left) / width) - 0.5) * (innerWidth / 100) * scale;
			let offsetYValue = (((pointer.y - top) / height) - 0.5) * (innerHeight / 100) * scale;

			smoothMotion.target = {
				x: Math.max(-maxOffset, Math.min(maxOffset, offsetXValue)) || 0,
				y: Math.max(-maxOffset, Math.min(maxOffset, offsetYValue)) || 0
			};

			element.style.transform = `translateX(calc(${offsetX} + ${smoothMotion.current.x}px)) translateY(${smoothMotion.current.y}px)`;
		});
	});

	// SVG Section Transition
	const randomSeed = Math.random();
	let svgContainer = $state({ width: 1, height: 1 });

	let svgGrid = $derived({
		height: Math.ceil(svgContainer.height / 50),
		width: Math.ceil((svgContainer.width * Math.ceil(svgContainer.height / 50)) / svgContainer.height)
	});

	let svgCells = $derived({
		x: [...Array(svgGrid.width).keys()],
		y: [...Array(svgGrid.height).keys()]
	});

	// Real-Time Clock (Chicago Time)
	let time = $state<string>();

	onMount(() => {
		const updateTime = () => {
			time = new Intl.DateTimeFormat('en-US', {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hourCycle: 'h23',
				timeZone: 'America/Chicago'
			}).format(new Date());
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);

		return () => clearInterval(interval);
	});
</script>

<svelte:window bind:innerWidth={innerWidth} bind:innerHeight={innerHeight} />

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
					<a href="/#projects">Projects</a>
				</li>
				<li>
					<a href="/#about">About</a>
				</li>
			</ul>
		</div>
		<div class="title">
			{#if innerWidth >= 768}
				{#if animate.trigger}
					<h1 style="justify-content: left;" in:fly={animationParams.title(0)}>Matthew</h1>			
					<h1 style="justify-content: right;">
						<span in:fly={animationParams.title(1)}>J. </span>
						<span style="z-index: 1;" in:fly={animationParams.title(2)}>Moran</span>
					</h1>
					<h2 style="justify-content: right;" in:fly={animationParams.title(3)}>Developer & Designer</h2>
					<svg class="line" fill="none" viewBox="0 0 808 108" xmlns="http://www.w3.org/2000/svg">
						<path d="M4 102c27 6 151-1 277-21 157-25 195 39 274 10 75-26 64-97 14-86-72 17 11 86 71 86 47 0 101-12 164-19" stroke="#55ff00" stroke-linecap="round" in:blur={animationParams.line}/>
					</svg>
				{/if}
			{:else}
				{#if animate.trigger}
					<h1 style="justify-content: left;" in:fly={animationParams.title(0)}>M</h1>
					<h1 style="justify-content: center; z-index: 1;" in:fly={animationParams.title(1)}>J</h1>
					<h1 style="justify-content: right;" in:fly={animationParams.title(2)}>M</h1>
					<svg class="line" fill="none" viewBox="0 0 735 403" xmlns="http://www.w3.org/2000/svg">
						<path d="M6 5c245 69 284 260 428 259 137-1 243-95 128-140-119-46-81 158 0 204 65 38 73 36 168 69" stroke="#5f0" stroke-linecap="round" in:blur={animationParams.line}/>
					</svg>
				{/if}
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
		bind:clientWidth={svgContainer.width}
		bind:clientHeight={svgContainer.height}
	>
		<svg viewBox="0 0 {svgGrid.width} {svgGrid.height}">
			{#each svgCells.x as x}
				{#each svgCells.y as y}
					{#if hash((y + 1) * (x + 1), randomSeed) < (y + 1) / (svgGrid.height + 1)}
						<rect {x} {y} width="1" height="1" shape-rendering="crispEdges" />
					{/if}
				{/each}
			{/each}
		</svg>
	</div>
</div>

<div id="resume">
	<div class="title">
		<Header text="Resume" icon="clipboard" direction="right" />
	</div>
	<div class="lists">
		<ul>
			<li class="header">Foundations</li>
			<li>TypeScript</li>
			<li>HTML + CSS</li>
			<li>SvelteKit</li>
			<li>Go</li>
			<li>Python</li>
			<li>Pandas + Matplotlib</li>
			<li>Bash</li>
			<li>Canvas</li>
		</ul>
		<ul>
			<li class="header">Toolkit</li>
			<li>Website Design</li>
			<li>Illustrator</li>
			<li>Photoshop</li>
			<li>Figma</li>
			<li>Data Analysis + Visualization</li>
			<li>DevOps</li>
			<li>QA + Testing</li>
		</ul>
		<ul>
			<li class="header">Ethos</li>
			<li>Accuracy</li>
			<li>Structure</li>
			<li>Transparency</li>
			<li>Reliability</li>
			<li>Integrity</li>
			<li>Inquiry</li>
			<li>Diligence</li>
		</ul>
	</div>
	<div class="download">
		<a href="/Matthew_J_Moran_Resume.pdf" download>
			Download Resume
		</a>
	</div>
</div>

<div id="projects">
	<div class="title">
		<Header text="Projects" icon="crane" direction="left" x={95} />
	</div>
	<div class="list">
		<a href="https://github.com/JSA-Partners" target="_blank">
			<ul>
				<li>CATS <span>2023-Present</span></li>
				<li>TypeScript, SvelteKit, Go</li>
			</ul>
		</a>
		<a href="https://github.com/mattjmoran/dotfiles-macos" target="_blank">
			<ul>
				<li>dotfiles for macOS <span>2021-2023</span></li>
				<li>Bash, Open Source</li>
			</ul>
		</a>
		<a href="/">
			<ul>
				<li>Generative Art <span>2023</span></li>
				<li>JavaScript, P5, Three.js</li>
			</ul>
		</a>
		<a href="/">
			<ul>
				<li>Digital Color Theory <span>2019</span></li>
				<li>Java, Processing</li>
			</ul>
		</a>
	</div>
</div>

<footer>
	<p>© {new Date().getFullYear()} Matthew J. Moran. All rights reserved.</p>
</footer>

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
		user-select: none;
		will-change: transform;
		& h1 {
			@extend %no-space, %flex-center;
			font: bold 15vw/100% 'Mars Display';
			height: calc(15vw * var(--title-height-percent));
			@media (--tablet) {
				font-size: 14rem;
				height: calc(14rem * var(--title-height-percent));
			}
			@media (--phone) {
				font-size: 12rem;
				height: calc(12rem * var(--title-height-percent));
			}
		}
		& h2 {
			@extend %no-space, %flex-center;
			font: 2vw/100% 'jgs_font';
			color: var(--light-gray);
			text-transform: uppercase;
		}
	}

	@keyframes line-movement {
		from {
				stroke-dashoffset: 120;
		}
		to {
				stroke-dashoffset: 0;
		}
	}

	#intro .line {
    left: 50%;
		width: 110vw;
		position: absolute;
    transform: translateX(-50%);
		will-change: transform;
    & path {
			stroke-width: 5;
			stroke-dasharray: 15;
			animation: line-movement 4s linear infinite;
			@media (--tablet) {
				stroke-width: 10;
				stroke-dasharray: 30;
				animation: line-movement 3s linear infinite;
			}
			@media (--phone) {
				stroke-width: 15;
				stroke-dasharray: 60;
				animation: line-movement 2s linear infinite;
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
		@media (--phone) {
			padding: 50px;
		}
	}

	#resume .title {
		@extend %flex-row;
		justify-content: left;
		width: 100%;
		max-width: var(--max-content-width);
		@media (--tablet), (--phone) {
			justify-content: center;
		}
	}

	#resume .lists {
		@extend %flex-row;
		justify-content: space-between;
		width: 100%;
		max-width: var(--max-content-width);
		margin-top: 50px;
		gap: 50px;
		& ul {
			@extend %no-space;
			list-style-type: none;
			color: white;
		}
		& li {
			font: 2rem 'AUTHENTIC Sans';
		}
		& li:nth-child(1) {
			font: 1rem 'jgs_font';
			color: var(--light-gray);
			margin-bottom: 10px;
			text-transform: uppercase;
		}
		@media (--tablet), (--phone) {
			@extend %flex-column;
			gap: 25px;
		}
	}

	#resume .download {
		@extend %flex-row;
		width: 100%;
		max-width: var(--max-content-width);
		margin-top: 25px;
		justify-content: right;
		& a {
			font: 1rem 'jgs_font';
			text-transform: uppercase;
			color: white;
			background: linear-gradient(to bottom, white 0%, white 100%) repeat-x 0 100% / 0px 0px;
			transition: background-size ease var(--transition-speed), color ease var(--transition-speed);
			&:hover {
				color: black;
				background-size: 100% 100%;
			}
			&::after {
				content: ' ***';
			}
		}
		@media (--tablet), (--phone) {
			justify-content: left;
		}
	}

	#projects {
		@extend %flex-column;
		padding: 70px;
		background-color: black;
		align-items: center;
		@media (--phone) {
			padding: 50px;
		}
	}

	#projects .title {
		@extend %flex-row;
		justify-content: right;
		width: 100%;
		max-width: var(--max-content-width);
		@media (--tablet), (--phone) {
			justify-content: center;
		}
	}

	#projects .list {
		@extend %flex-column;
		width: 100%;
		max-width: var(--max-content-width);
		margin-top: 50px;
		& a {
			text-decoration: none;
		}
		& ul {
			@extend %no-space, %flex-row;	
			justify-content: space-between;
			list-style-type: none;
			color: white;
			padding: 5px 0;
			font: 1.5rem 'AUTHENTIC Sans';
			background: linear-gradient(to bottom, white 0%, white 100%) repeat-y 0 100% / 0px 0px;
			transition: background-size ease var(--transition-speed), color ease var(--transition-speed);
			&:hover {
				color: black;
				background-size: 100% 100%;
			}
			@media (--tablet), (--phone) {
				@extend %flex-column;
			}
			& li {
				&:nth-child(2) {
					text-align: right;
					@media (--tablet), (--phone) {
						text-align: left;
					}
				}
				& span {
					font: 1rem 'jgs_font';
					color: var(--light-gray);
					text-transform: uppercase;
				}
			}
		}
	}

	footer {
		@extend %flex-row;
		justify-content: center;
		background-color: black;
		padding: 70px 70px 30px 70px;
		@media (--phone) {
			padding: 30px;
		}
		& p {
			width: 100%;
			max-width: var(--max-content-width);
			color: white;
			font: 1rem 'jgs_font';
			text-transform: uppercase;
			text-align: right;
			@media (--tablet), (--phone) {
				text-align: center;
			}
			@media (--phone) {
				font-size: 0.8rem;
			}
		}		
	}
</style>