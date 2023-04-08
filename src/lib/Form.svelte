<script>
	import { setContext } from "svelte"
	import { createEventDispatcher } from "svelte"
	import { writable } from "svelte/store"

	export let form = {}
	export let sharedValidationFn = null // The condition that marks every field as invalid

	let formElement
	let errors = writable({})

	const dispatch = createEventDispatcher()

	const isFormValid = () => {
		return !Object.values($errors).some(field => Object.values(field).some(errorObject => errorObject.error))
	}

	const validateField = (field, value) => {
		form[field]?.validators &&
			form[field].validators.forEach(fn => {
				const error = fn(value)
				errors.update(e => {
					e[field] = { ...e[field], ...error }
					return e
				})
			})
	}

	const validateForm = (data, fn) => {
		Object.keys(data).forEach(field => validateField(field, data[field]))

		if (fn) {
			let error = fn(data)
			errors.update(e => {
				e.shared = { ...e.shared, ...error }
				return e
			})
		}
	}

	const onBlur = e => validateField(e.target.name, e.target.value)

	const onSubmit = e => {
		const formData = new FormData(e.target)

		const data = {}

		for (let field of formData) {
			const [key, value] = field
			data[key] = value ? value : null
		}

		validateForm(data, sharedValidationFn)
		console.log($errors)

		return dispatch("submit", { valid: isFormValid(), data })
	}

	export const reset = () => formElement.reset()

	setContext("form", { errors, onBlur })
</script>

<form on:submit={onSubmit} bind:this={formElement}>
	<slot />
</form>

<style>
	form {
		padding: 2.75rem 1.5rem;
		display: grid;
		row-gap: 1.75rem;
	}

	@media (min-width: 50rem) {
		form {
			padding: 0 2rem 0 7rem;
			max-width: 32.8rem;
		}
	}
</style>
