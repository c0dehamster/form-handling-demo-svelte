<script>
	import cardLogo from "$lib/images/card-logo.svg"
	import cardFrontSide from "$lib/images/bg-card-front.png"
	import cardBackSide from "$lib/images/bg-card-back.png"

	import Form from "../lib/Form.svelte"
	import Input from "../lib/Input.svelte"
	import Error from "../lib/Error.svelte"
	import CardFront from "../lib/CardFront.svelte"
	import CardBack from "../lib/CardBack.svelte"

	import { Validators } from "../lib/Validators"

	let data = {}
	let formElement
	let form = {
		cardholderName: {
			validators: [Validators.required],
		},
		cardNumber: {
			validators: [Validators.required, Validators.isNumber(/[^\d\s-]/)], // "Not a digit, a whitespace, or a hyphen"
		},
		month: {
			validators: [Validators.required, Validators.isValidMonth],
		},
		year: {
			validators: [Validators.required],
		},
		cvc: {
			validators: [Validators.required, Validators.isNumber(/\D/)], // "Not a digit"
		},
	}

	const onSubmit = e => {
		if (e?.detail?.data) {
			console.log(data)
		} else {
			console.log("Invalid form")
		}
	}
</script>

<main class="wrapper">
	<div class="preview">
		<div class="card-front">
			<CardFront {cardLogo} {cardFrontSide} />
		</div>

		<div class="card-back">
			<CardBack {cardBackSide} />
		</div>
	</div>

	<Form {form} on:submit={onSubmit}>
		<div class="inputs">
			<div class="input-wrapper input-wrapper--span-two">
				<Input name="cardholderName" label="cardholder name" placeholder="e.g. Jane Appleseed" />
				<Error fieldNames="cardholderName" />
			</div>

			<div class="input-wrapper input-wrapper--span-two">
				<Input name="cardNumber" label="card number" placeholder="e.g. 1234 5678 9123 0000" />
				<Error fieldNames="cardNumber" />
			</div>

			<fieldset class="input-wrapper">
				<legend class="label">Exp. date (mm/yyy)</legend>
				<div class="date-wrapper">
					<Input name="month" placeholder="MM" maxlength="2" />
					<Input name="year" placeholder="YY" maxlength="2" />
				</div>

				<Error fieldNames={["month", "year"]} />
			</fieldset>

			<div class="input-wrapper">
				<Input name="cvc" label="cvc" placeholder="e.g. 123" maxlength="3" />
				<Error fieldNames="cvc" />
			</div>
		</div>

		<button class="button button--submit" type="submit">Confirm</button>
	</Form>
</main>

<style>
	.wrapper {
		width: 100%;
		height: fit-content;

		display: grid;

		background-image: var(--background-mobile);
		background-repeat: no-repeat;
		background-size: contain;
	}

	/* A whole bunch of magical numbers that are supposed to make this look like a credit card */

	.preview {
		container: card-display / inline-size;

		position: relative;
		height: 75.2vw;
		width: 100%;
	}

	.card-front,
	.card-back {
		aspect-ratio: 1.82;
		container-type: inline-size;
		width: min(76cqw, 28rem);

		position: absolute;

		color: var(--color-neutral-200);
	}

	.card-front {
		container-name: card-front;

		left: 4.27cqw;
		top: 33.6cqw;
		z-index: 1;
	}

	.card-back {
		container-name: card-back;
		top: 8.53cqw;
		right: 4.27cqw;
	}

	/* Form elements */

	.inputs,
	.date-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.inputs {
		row-gap: 1.25rem;
		column-gap: 0.75rem;
	}

	.date-wrapper {
		column-gap: 0.5rem;
	}

	fieldset {
		padding: none;
		height: fit-content;

		border: none;
	}

	legend {
		padding-block: 3px; /* To make it visually match the labels */
	}

	.input-wrapper--span-two {
		grid-column: span 2;
	}

	@media (min-width: 50rem) {
		.wrapper {
			min-height: 58%;

			grid-template-columns: 1fr 1fr;
			align-items: center;
		}

		.preview {
			height: fit-content;

			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 2.25rem;
			align-items: end;
		}

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
	}
</style>