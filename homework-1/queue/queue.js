import LinkedList from '../linked-list/linked-list.js'

export default class Queue {
	constructor() {
		this.list = new LinkedList()
	}

	get head() {
		return this.list.first.value
	}

	get length() {
		return this.list.length
	}

	push(value) {
		this.list.addLast(value)
	}

	pop() {
		try {
			return this.list.popFirst()
		} catch {
			throw new Error('Queue is empty')
		}
	}
}
