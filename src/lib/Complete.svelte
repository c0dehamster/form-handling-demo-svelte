<script>
	import iconComplete from "./images/icon-complete.svg"
</script>

<div class="complete">
	<img class="icon" src={iconComplete} alt="" />
	<h2 class="complete__header">Thank you!</h2>
	<p class="complete__description">We've added your card details</p>
	<slot />
</div>

<style>
	.complete {
		display: grid;
		justify-items: center;
	}

	.icon {
		margin-block-end: 2rem;
	}

	.complete__header {
		margin-block-end: 1rem;

		font-weight: 500;
		line-height: 1;
		text-transform: uppercase;
		color: var(--color-neutral-800);
		letter-spacing: 2px;
	}

	.complete__description {
		margin-block-end: 2.5rem;
		color: var(--color-neutral-400);
		font-size: var(--font-size-500);
	}
</style>
