<script>
	import { getContext } from "svelte"
	import { values } from "./stores"

	export let label = ""
	export let name
	export let autocomplete = "off"
	export let maxlength = ""
	export let placeholder = ""
	export let onInput = () => {}

	const { errors, onBlur } = getContext("form")

	let isError = ""

	$: {
		if ($errors?.[name]) {
			isError = Object.keys($errors[name]).some(
				errorKey => $errors[name][errorKey].error
			)
				? "error"
				: ""
		}
	}
</script>

{#if label}
	<label for={name} class={`label label--${isError}`}>{label}</label>
{/if}

<input
	{name}
	id={name}
	class={`input input--${isError}`}
	{autocomplete}
	{maxlength}
	on:blur={onBlur}
	{placeholder}
	on:input={onInput}
	bind:value={$values[name]} />

<style>
</style>
