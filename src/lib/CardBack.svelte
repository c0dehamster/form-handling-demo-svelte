<script>
	export let cardBackSide = ""
	export let data = {}
</script>

<div class="card-back__contents" style="background-image: url({cardBackSide});">
	<p class="card-back__cvc">
		<span class="cvc">{data.cvc ?? "000"}</span>
	</p>
</div>

<style>
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
</style>
