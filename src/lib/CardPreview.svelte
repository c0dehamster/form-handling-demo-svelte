<script>
	import { values } from "./stores"

	export let cardLogo = ""
	export let cardFrontSide = ""
	export let cardBackSide = ""

	const replaceGradually = (value, placeholder) => {
		if (!value) return placeholder

		return `${placeholder.slice(value.length)}${value}`
	}

	$: expiry = `${replaceGradually($values.month, "00")}/${replaceGradually(
		$values.year,
		"00"
	)}`

	$: cardNumberFormatted = replaceGradually(
		$values.cardNumber,
		"0000000000000000"
	)
</script>

<div class="card-front">
	<div
		class="card-front__contents"
		style="background-image: url({cardFrontSide})">
		<img class="card-front__logo" src={cardLogo} alt="" />

		<div class="card-front__details">
			<p class="card-front__number">
				<!-- Unfortunately, Montserrat is not a monospace font-->
				<span class="four-digit-slice"
					>{cardNumberFormatted.slice(0, 4)}</span>
				<span class="four-digit-slice"
					>{cardNumberFormatted.slice(4, 8)}</span>
				<span class="four-digit-slice"
					>{cardNumberFormatted.slice(8, 12)}</span>
				<span class="four-digit-slice"
					>{cardNumberFormatted.slice(12, 16)}</span>
			</p>

			<p class="card-front__name">
				{$values.cardholderName
					? $values.cardholderName
					: "Jane Appleseed"}
			</p>
			<p class="card-front__expiry">{expiry}</p>
		</div>
	</div>
</div>

<div class="card-back">
	<div
		class="card-back__contents"
		style="background-image: url({cardBackSide});">
		<p class="card-back__cvc">
			<span class="cvc">{replaceGradually($values.cvc, "000")}</span>
		</p>
	</div>
</div>

<style>
	/* A whole bunch of magical numbers that are supposed to make this look like a credit card */

	.card-front,
	.card-back {
		aspect-ratio: 1.82;
		container-type: inline-size;
		width: min(76cqw, 28rem);

		border-radius: 0.5rem;

		position: absolute;

		color: var(--color-neutral-200);
	}

	.card-front {
		container-name: card-front;

		left: 4.27cqw;
		top: 33.6cqw;
		z-index: 1;
	}

	/* Not sure how to get the shadows right */

	.card-front::before {
		content: "";
		position: absolute;
		height: 3rem;
		z-index: -1;

		border-radius: 0.5rem;

		left: 0;
		right: 0;
		bottom: 0;

		box-shadow: 1rem 1rem 4.5rem var(--color-neutral-400);
	}

	.card-back {
		container-name: card-back;
		top: 8.53cqw;
		right: 4.27cqw;
	}

	.card-front__contents {
		height: 100%;

		padding: 7cqw;
		display: grid;

		background-repeat: no-repeat;
		background-size: cover;
	}

	.card-front__logo {
		width: 19.2cqw;
	}

	.card-front__details {
		align-self: end;
		display: grid;
		grid-template-columns: 1fr 1fr;
		row-gap: 5.6cqw;
	}

	.card-front__number {
		grid-column: span 2;
		display: grid;
		grid-template-columns: repeat(4, 1fr);

		font-size: 6.29cqw;
		letter-spacing: 0.83cqw;
	}

	.card-front__name {
		text-transform: uppercase;
		letter-spacing: 0.3cqw;
	}

	.card-front__expiry {
		justify-self: end;
		letter-spacing: 0.2cqw;
	}

	.card-front__name,
	.card-front__expiry {
		font-size: 3.5cqw;
	}

	.card-back__contents {
		height: 100%;
		padding-inline-end: 9.1cqw;
		padding-block-start: 22.4cqw;

		background-repeat: no-repeat;
		background-size: cover;
	}

	.card-back__cvc {
		height: 9cqw;
		text-align: end;
		padding-inline-end: 4.2cqw;

		display: flex;
		align-items: center;
		justify-content: end;

		font-size: 3.5cqw;
	}

	@media (min-width: 50rem) {
		.card-back,
		.card-front {
			position: relative;
			inset: auto;

			width: min(62.2cqw, 28rem);
		}

		.card-front {
			right: 6.75rem;
		}

		.card-back {
			right: 1rem;
		}

		.card-front::before {
			left: 50%;
		}

		.card-back::before {
			content: "";
			position: absolute;
			z-index: -1;

			border-radius: 0.5rem;

			left: 50%;
			top: 50%;
			right: 0;
			bottom: 0;

			box-shadow: 0 0 6rem var(--color-neutral-400);
		}
	}
</style>
