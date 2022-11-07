export default function forEach(iterable = [], fn, options = {}) {
	const iterator = iterable[ Symbol.iterator ]()
	const generator = worker()
	const promise = {}

	let nextBreak
	let breaks = 0

	function scheduleNextBreak() {
		nextBreak = +new Date() + (options.intervalMs ?? 100)
	}

	function sleep() {
		if (options.debug) {
			console.debug('---sleep---')
		}

		breaks++

		setTimeout(
			() => {
				if (options.debug) {
					console.debug('---awake---')
				}

				scheduleNextBreak()
				generator.next()
			},
			options.timeoutMs ?? 100
		)
	}

	function* worker() {
		let index = 0
		scheduleNextBreak()

		while (true) {
			if (+new Date() >= nextBreak) {
				sleep()
				yield
			}

			const { done, value } = iterator.next()
			index++

			if (done) {
				return promise.resolve(breaks)
			}

			try {
				if (options.debug) {
					console.debug(value, index, iterable)
				}

				fn(value, index, iterable)
			} catch (err) {
				return promise.reject(err)
			}
		}
	}

	return new Promise((resolve, reject) => {
		promise.resolve = resolve
		promise.reject = reject
		generator.next()
	})
}

let total = 0

forEach(
	[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27 ],
	() => total++,
	{
		debug: true,
		intervalMs: 10,
		timeoutMs: 100
	}
)
	.then(count => {
		console.log('Done with', count, 'breaks')
		console.log('Total:', total)
	})
	.catch(err => {
		console.log('Failed', err.toString())
	})
