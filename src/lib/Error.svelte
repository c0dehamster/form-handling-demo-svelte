<script>
	import { getContext } from "svelte"

	export let fieldNames

	const { errors } = getContext("form")

	let messages = []

	const setErrorMessages = fieldName => {
		if ($errors?.[fieldName]) {
			messages = Object.values($errors[fieldName])
				.map(value => value.message)
				.filter(message => message)
		}
	}

	$: {
		if (Array.isArray(fieldNames)) {
			fieldNames.forEach(fieldName => {
				setErrorMessages(fieldName)
			})
		} else {
			if ($errors?.[fieldNames]) {
				setErrorMessages(fieldNames)
			}
		}
	}
</script>

<p class="error-message">{messages[0] ?? ""}</p>

<style>
</style>
