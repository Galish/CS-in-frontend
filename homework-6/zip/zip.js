export default function zip(...iterables) {
	const iterators = new Array(iterables.length)

	for (const i in iterables) {
		const iterator = iterables[ i ]?.[ Symbol.iterator ]?.()

		if (iterator == null) {
			continue
		}

		iterators[ i ] = iterator
	}

	return {
		[ Symbol.iterator ]() {
			return this
		},

		next() {
			const value = []
			let done = true

			for (const iter of iterators) {
				const nextResult = iter?.next?.()

				if (nextResult?.done === false) {
					value.push(nextResult.value)
					done = false
				}
			}

			return {
				value,
				done
			}
		}
	}
}
