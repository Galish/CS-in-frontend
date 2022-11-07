export default class Worker {
	#promise

	constructor(iterator, fn) {
		this.#promise = {}
		this.iterator = iterator
		this.fn = fn
	}

	resolve(...args) {
		this.#promise.resolve?.(...args)

		return this
	}

	reject(...args) {
		this.#promise.reject?.(...args)

		return this
	}

	await() {
		return new Promise((resolve, reject) => {
			this.#promise = { resolve, reject }
		})
	}
}
