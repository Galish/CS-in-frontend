export default function binarySearch(value, sortedArray = []) {
	let leftIndex = 0
	let rightIndex = sortedArray.length - 1

	while (leftIndex <= rightIndex) {
		const currentIndex = Math.round((leftIndex + rightIndex) / 2)

		if (sortedArray[ currentIndex ] === value) {
			return currentIndex
		}

		if (value < sortedArray[ currentIndex ]) {
			rightIndex = currentIndex - 1
		} else {
			leftIndex = currentIndex + 1
		}
	}
}
