export default function mapSeq(iterable, modifiers = []) {
	if (typeof iterable?.[ Symbol.iterator ] !== 'function') {
		throw new Error('Object is not iterable')
	}

	const iterator = iterable[ Symbol.iterator ]()

	return {
		[ Symbol.iterator ]() {
			return this
		},

		next() {
			const nextResult = iterator.next()

			if (nextResult.done === true) {
				return nextResult
			}

			let value = nextResult.value

			for (const fn of modifiers) {
				value = fn(value)
			}

			return {
				value,
				done: false
			}
		}
	}
}
