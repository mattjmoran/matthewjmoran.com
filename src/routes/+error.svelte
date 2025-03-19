<script lang="ts">
	import { page } from '$app/state';
</script>

<div id="error">
	<div>
		<h1>{page.status}</h1>
		{#if page.error}
			<p>{page.error.message}</p>
		{/if}
	</div>
</div>

<style lang="postcss">
	@import '$lib/styles/media-queries.pcss';
	@import '$lib/styles/extends.pcss';

	#error {
		height: 100vh;
		display: grid;
		place-items: center;
		text-align: center;
		color: white;
		background-color: black;
	}

	h1 {
		@extend %no-space;
		font: bold 15vw/100% 'Mars Display';
	}

	p {
		@extend %no-space;
		font: 2rem 'AUTHENTIC Sans';
		@media (--tablet), (--phone) {
			font-size: 1rem;
		}
	}
</style>
