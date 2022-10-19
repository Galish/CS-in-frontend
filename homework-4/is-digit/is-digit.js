const UNICODE_GROUPS = [
	[ 48, 57 ], // Ascii / arab
	[ 8544, 8575 ], // roman
]

export default function isDigit(str = '') {
	const normalized = str.normalize()
	let currentGroupIndex

	for (const char of normalized) {
		const groupIndex = charCodeGroup(char)

		if (currentGroupIndex === undefined) {
			currentGroupIndex = groupIndex
		} else if (currentGroupIndex !== groupIndex) {
			return false
		}
	}

	return true
}

function charCodeGroup(char) {
	const code = char.codePointAt(0)

	for (const [ index, [ codeFrom, codeTo ] ] of UNICODE_GROUPS.entries()) {
		if (code >= codeFrom && code <= codeTo) {
			return index
		}
	}

	return null
}
