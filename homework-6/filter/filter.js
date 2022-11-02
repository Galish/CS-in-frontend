export default function filter(iterable, predicate) {
	if (typeof iterable?.[ Symbol.iterator ] !== 'function') {
		throw new Error('Object is not iterable')
	}

	if (typeof predicate !== 'function') {
		throw new Error('Predicate must be a function')
	}

	return {
		[ Symbol.iterator ]() {
			return this
		},

		next() {
			const nextResult = iterable.next()

			if (
				nextResult.done === true
				||
				predicate(nextResult.value)
			) {
				return nextResult
			}

			return this.next()
		}
	}
}
