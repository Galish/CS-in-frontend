const UNICODE_GROUPS = [
	[ 48, 57 ], // Ascii / arab
	[ 8544, 8575 ], // roman
	[ 65799, 65846 ], // aegean
]

export default function isDigit(str = '') {
	const normalized = str.normalize()
	let currentGroupIndex

	for (const char of normalized) {
		const code = char.codePointAt(0)
		const groupIndex = binarySearch(code, UNICODE_GROUPS, ([ min ]) => min)

		if (currentGroupIndex === undefined) {
			currentGroupIndex = groupIndex
		} else if (currentGroupIndex !== groupIndex) {
			return false
		}
	}

	return true
}

function binarySearch(value, sortedArray = [], getValue) {
	let leftIndex = 0
	let rightIndex = sortedArray.length - 1

	while (leftIndex <= rightIndex) {
		const currentIndex = Math.round((leftIndex + rightIndex) / 2)
		const current = sortedArray[ currentIndex ]

		if (inRange(current, value)) {
			return currentIndex
		}

		const compareWith = getValue?.(current) ?? current

		if (value < compareWith) {
			rightIndex = currentIndex - 1
		} else {
			leftIndex = currentIndex + 1
		}
	}
}

function inRange([ min, max ], value) {
	return value >= min && value <= max
}
