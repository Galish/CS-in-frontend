import LinkedList from '../linked-list/linked-list'

export default class Dequeue {
	constructor() {
		this.list = new LinkedList()
	}

	get head() {
		return this.list.first.value
	}

	get length() {
		return this.list.length
	}

	unshift(value) {
		this.list.addFirst(value)
	}

	push(value) {
		this.list.addLast(value)
	}

	shift() {
		try {
			return this.list.popFirst()
		} catch {
			throw new Error('Queue is empty')
		}
	}

	pop() {
		try {
			return this.list.popLast()
		} catch {
			throw new Error('Queue is empty')
		}
	}
}
