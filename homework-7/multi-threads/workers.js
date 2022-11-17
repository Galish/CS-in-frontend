import Worker from './worker.js'

export default class Workers {
	#workers = []
	#index = 0

	add(iterator, fn) {
		const worker = new Worker(iterator, fn)

		this.#workers.push(worker)

		return worker.await()
	}

	remove(worker) {
		const index = this.#workers.indexOf(worker)

		if (~index !== 0) {
			this.#workers.splice(index, 1)
			this.#index--
		}

		return this
	}

	[ Symbol.iterator ]() {
		return this
	}

	next() {
		if (this.#workers.length === 0) {
			return {
				done: true,
				value: false
			}
		}

		if (this.#index >= this.#workers.length) {
			this.#index = 0
		}

		return {
			done: false,
			value: this.#workers[ this.#index++ ]
		}
	}
}
