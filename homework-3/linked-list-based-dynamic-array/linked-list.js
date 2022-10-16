import Node from './node'

export default class LinkedList {
	constructor() {
		this.first = null
		this.last = null
		this.length = 0
	}

	addLast(value) {
		const node = new Node(value)

		if (this.first === null) {
			this.first = node
			this.last = node
		} else {
			this.last.next = node
			node.prev = this.last
			this.last = node
		}

		this.length++
	}

	addFirst(value) {
		const node = new Node(value)

		if (this.first === null) {
			this.first = node
			this.last = node
		} else {
			this.first.prev = node
			node.next = this.first
			this.first = node
		}

		this.length++
	}
}
