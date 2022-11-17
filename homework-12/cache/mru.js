// Most Recently Used
import LinkedList from '../../homework-1/linked-list/linked-list'

export default class MRUCache {
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
			this.#linkedList.addLast(key)
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
