import { writable } from "svelte/store"

export const values = writable({
	cardholderName: "",
	cardNumber: "",
	month: "",
	year: "",
	cvc: "",
})
