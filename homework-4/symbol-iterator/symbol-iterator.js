export default function iter(str = '') {
	let i = 0

	return {
		[ Symbol.iterator ]() {
			return this
		},

		next() {
			if (i === str.length) {
				return {
					done: true
				}
			}

			const char = str.charAt(i)
			const charCode = str.charCodeAt(i)
			i++

			if (isSurrogatePairFirstPart(char)
				&&
				isSurrogatePairSecondPart(str.charAt(i))
			) {
				i++

				return {
					value: char + str.charAt(i - 1),
					done: false
				}
			}

			return {
				value: char,
				done: false
			}
		}
	}
}

function isSurrogatePairFirstPart(char) {
	const charCode = char.charCodeAt(0)

	return charCode >= 55296 && charCode <= 56319
}

function isSurrogatePairSecondPart(char) {
	const charCode = char.charCodeAt(0)

	return charCode >= 56320 && charCode <= 57343
}
