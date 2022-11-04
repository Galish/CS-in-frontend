export default function seq(...iterables) {
	let iterator
	const parentIterator = iterables[ Symbol.iterator ]()

	const parentNext = () => {
		iterator = parentIterator.next().value?.[ Symbol.iterator ]?.()
	}

	parentNext()

	return {
		[ Symbol.iterator ]() {
			return this
		},

		next() {
			const nextResult = iterator?.next?.()

			if (nextResult == null) {
				return { done: true }
			}

			if (nextResult.done === true) {
				parentNext()

				return this.next()
			}

			return nextResult
		}
	}
}
