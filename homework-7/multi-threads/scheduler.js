import Workers from './workers.js'

export default class Scheduler {
	#exec
	#isRunning = false
	#options
	#workers

	constructor(options = {}) {
		this.#options = {
			debug: options.debug ?? false,
			intervalMs: options.intervalMs ?? 10,
			timeoutMs: options.timeoutMs ?? 100
		}

		this.#workers = new Workers()
		this.#exec = this.#executor()
	}

	#addWorker(iterator, fn) {
		const worker = this.#workers.add(iterator, fn)

		if (this.#isRunning === false) {
			this.#isRunning = true

			setTimeout(() => {
				this.#scheduleNextBreak()
				this.#exec.next()
			}, 0)
		}

		return worker
	}

	#scheduleNextBreak() {
		this.nextBreak = +new Date() + this.#options.intervalMs
	}

	#debug(...args) {
		if (this.#options.debug) {
			console.debug(...args)
		}
	}

	*#executor() {
		for (const worker of this.#workers) {
			while(true) {
				const { done, value } = worker.iterator.next()

				if (done) {
					this.#workers.remove(worker.resolve())
					break
				}

				try {
					const result = worker.fn(value)
					this.#debug(value, result)
				} catch (err) {
					this.#workers.remove(worker.reject(err))
					break
				}

				if (this.nextBreak < +new Date()) {
					this.#debug('-sleep-')

					setTimeout(
						() => {
							this.#scheduleNextBreak()
							this.#debug('-awake-')
							this.#exec.next()
						},
						this.#options.timeoutMs
					)

					yield
					break
				}
			}
		}

		this.#isRunning = false
	}

	forEach(iterable, fn) {
		return this.#addWorker(iterable[ Symbol.iterator ](), fn)
	}
}
