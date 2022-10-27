export default function splitString(
	str = '',
	delimitters = ['.', ',', ';', ' ']
) {
	const regExp = new RegExp(`[${delimitters.join('')}]+`)
	return str.split(regExp)
}
