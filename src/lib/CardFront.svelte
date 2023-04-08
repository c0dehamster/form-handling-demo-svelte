<script>
	export let cardLogo = ""
	export let cardFrontSide = ""
	export let data = { cardNumber: "1234567891230000" }

	let expiry = `${data.month ?? "00"}/${data.year ?? "00"}`

	$: cardNumber = data.cardNumber ?? ""
	$: cardNumberFormatted = `${cardNumber}${"0000000000000000".slice(cardNumber.length)}`
</script>

<div class="card-front__contents" style="background-image: url({cardFrontSide})">
	<img class="card-front__logo" src={cardLogo} alt="" />

	<div class="card-front__details">
		<p class="card-front__number">
			<!-- Unfortunately, Montserrat is not a monospace fonr-->
			<span class="four-digit-slice">{cardNumberFormatted.slice(0, 4)}</span>
			<span class="four-digit-slice">{cardNumberFormatted.slice(4, 8)}</span>
			<span class="four-digit-slice">{cardNumberFormatted.slice(8, 12)}</span>
			<span class="four-digit-slice">{cardNumberFormatted.slice(12, 16)}</span>
		</p>

		<p class="card-front__name">{data.cardholderName ?? "Jane Appleseed"}</p>
		<p class="card-front__expiry">{expiry}</p>
	</div>
</div>

<style>
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
</style>
