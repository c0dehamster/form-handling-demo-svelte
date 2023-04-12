export const replaceGradually = (value, placeholder) => {
	if (!value) return placeholder

	return `${placeholder.slice(value.length)}${value}`
}
