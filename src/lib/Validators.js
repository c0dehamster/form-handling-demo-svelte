const required = value => {
	if (value === "" || value == null) {
		return {
			required: {
				error: true,
				message: "Can't be blank",
			},
		}
	}

	return { required: { error: false } }
}

const isNumber = pattern => {
	return value => {
		if (value && value.match(pattern)) {
			return {
				isNumber: {
					error: true,
					message: "Wrong format, numbers only",
				},
			}
		}

		return { isNumber: { error: false } }
	}
}

const isValidMonth = value => {
	if (value && (Number(value) <= 0 || Number(value) > 12)) {
		return {
			isValidMonth: {
				error: true,
				message: "Please enter a valid date",
			},
		}
	}

	return { isValidMonth: { error: false } }
}

export const Validators = {
	required,
	isNumber,
	isValidMonth,
}
