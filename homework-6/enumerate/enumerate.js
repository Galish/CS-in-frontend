export default function enumerate(iterable) {
	if (typeof iterable?.[ Symbol.iterator ] !== 'function') {
		throw new Error('Object is not iterable')
	}

	let iteration = 0

	return {
		[ Symbol.iterator ]() {
			return this
		},

		next() {
			const nextResult = iterable.next()

			if (nextResult.done) {
				return nextResult
			}

			return {
				done: false,
				value: [ iteration++, nextResult.value ]
			}
		}
	}
}
