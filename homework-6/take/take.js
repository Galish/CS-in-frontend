export default function take(iterable, count = 1) {
	if (typeof iterable?.[ Symbol.iterator ] !== 'function') {
		throw new Error('Object is not iterable')
	}

	let i = 0

	return {
		[ Symbol.iterator ]() {
			return this
		},

		next() {
			if (i === count) {
				return {
					done: true
				}
			}

			i++

			return iterable.next()
		}
	}
}
