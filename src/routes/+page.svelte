<script>
	import cardLogo from "$lib/images/card-logo.svg"
	import cardFrontSide from "$lib/images/bg-card-front.png"
	import cardBackSide from "$lib/images/bg-card-back.png"

	import Form from "../lib/Form.svelte"
	import Input from "../lib/Input.svelte"
	import Error from "../lib/Error.svelte"
	import CardPreview from "../lib/CardPreview.svelte"
	import Complete from "../lib/Complete.svelte"

	import { Validators } from "../lib/Validators"
	import { values } from "../lib/stores"

	let formElement
	let isComplete = false

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
		if (e?.detail?.valid) {
			console.log(e.detail.data)
			isComplete = true
		} else {
			console.log("Invalid form")
		}
	}

	const reset = () => {
		isComplete = false
		formElement.reset()
		values.set({})
	}
</script>

<main class="wrapper">
	<div class="preview">
		<CardPreview {cardLogo} {cardFrontSide} {cardBackSide} />
	</div>

	<Form {form} on:submit={onSubmit} bind:this={formElement}>
		{#if !isComplete}
			<div class="inputs">
				<div class="input-wrapper input-wrapper--span-two">
					<Input
						name="cardholderName"
						label="cardholder name"
						placeholder="e.g. Jane Appleseed" />
					<Error fieldNames="cardholderName" />
				</div>

				<div class="input-wrapper input-wrapper--span-two">
					<Input
						name="cardNumber"
						label="card number"
						placeholder="e.g. 1234 5678 9123 0000" />
					<Error fieldNames="cardNumber" />
				</div>

				<fieldset class="input-wrapper">
					<legend class="label">Exp. date (mm/yy)</legend>
					<div class="date-wrapper">
						<Input name="month" placeholder="MM" maxlength="2" />
						<Input name="year" placeholder="YY" maxlength="2" />
					</div>

					<Error fieldNames={["month", "year"]} />
				</fieldset>

				<div class="input-wrapper">
					<Input
						name="cvc"
						label="cvc"
						placeholder="e.g. 123"
						maxlength="3" />
					<Error fieldNames="cvc" />
				</div>
			</div>

			<button class="button button--submit" type="submit">Confirm</button>
		{:else}
			<Complete>
				<button class="button" type="reset" on:click={reset}
					>Continue</button>
			</Complete>
		{/if}
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

	.preview {
		container: card-display / inline-size;

		position: relative;
		height: 75.2vw;
		width: 100%;
	}

	/* Form elements */

	.inputs,
	.date-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.inputs {
		row-gap: 0.75rem;
		column-gap: 0.75rem;
	}

	.input-wrapper {
		display: grid;
		row-gap: 0.5rem;
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
		padding-block-end: 0.5rem; /* To make it visually match the labels */
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

		.inputs {
			row-gap: 1rem;
			column-gap: 1.5rem;
		}
	}
</style>
