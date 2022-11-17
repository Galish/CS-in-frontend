// Least recently used
import LinkedList from '../../homework-1/linked-list/linked-list'

export default class LRUCache {
	#size
	#cache
	#linkedList

	constructor(size = 10) {
		this.#size = size
		this.#cache = new Map()
		this.#linkedList = new LinkedList()
	}

	get(key) {
		if (this.#cache.has(key)) {
			this.#linkedList.pop(key)
			this.#linkedList.addFirst(key)
		}

		return this.#cache.get(key)
	}

	set(key, value) {
		if (this.#linkedList.length >= this.#size) {
			const key = this.#linkedList.popLast()
			this.#cache.delete(key)
		}

		this.#linkedList.addFirst(key)

		this.#cache.set(key, value)
	}
}


/*
export default class LRUCache {
	#size
	#cache

	constructor(size = 10) {
		this.#size = size
		this.#cache = new Map()
	}

	get(key) {
		if (!this.#cache.has(key)) {
			return
		}

		const value = this.#cache.get(key)

		this.#cache.delete(key)
		this.#cache.set(key, value)

		return value
	}

	set(key, value) {
		if (this.#cache.size >= this.#size) {
			const iterator = this.#cache.keys()
			const key = iterator.next().value

			this.#cache.delete(key)
		}

		this.#cache.set(key, value)
	}
}
*/
