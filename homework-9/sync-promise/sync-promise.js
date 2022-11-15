export default class SyncPromise {
	#nil = Symbol('empty')
	#data = this.#nil
	#err = this.#nil

	static resolve(data) {
		return new SyncPromise(resolve => resolve(data))
	}

	static reject(err) {
		return new SyncPromise((_, reject) => reject(err))
	}

	constructor(fn) {
		this.handlers = {}

		fn(this.resolve.bind(this), this.reject.bind(this))

		if (this.isResolved) {
			return this.syncResolve(this.#data)
		}

		if (this.isRejected) {
			return this.syncReject(this.#err)
		}

		return new Promise(this.handlePromise)
	}

	get isResolved() {
		return this.#data !== this.#nil
	}

	get isRejected() {
		return this.#err !== this.#nil
	}

	handlePromise = (resolve, reject) => {
		this.handlers.resolve = resolve
		this.handlers.reject = reject
	}

	resolve(data) {
		this.#data = data
		this.handlers?.resolve?.(data)
	}

	reject(err) {
		this.#err = err
		this.handlers?.reject?.(err)
	}

	syncResolve(data) {
		return {
			catch() {
				return new SyncPromise(resolve => resolve(data))
			},
			then(cb) {
				return new SyncPromise(resolve => resolve(cb(data)))
			}
		}
	}

	syncReject(err) {
		return {
			catch(cb) {
				return new SyncPromise(resolve => resolve(cb(err)))
			},
			then() {
				return new SyncPromise((_, reject) => reject(err))
			}
		}
	}
}
