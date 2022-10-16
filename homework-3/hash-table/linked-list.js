import Node from './node'

export default class LinkedList {
	constructor() {
		this.first = null
		this.last = null
		this.length = 0
	}

	addLast(...args) {
		const node = new Node(...args)

		if (this.first === null) {
			this.first = node
			this.last = node
		} else {
			this.last.next = node
			this.last = node
		}

		this.length++
	}

	addFirst(...args) {
		const node = new Node(...args)

		if (this.first === null) {
			this.first = node
			this.last = node
		} else {
			node.next = this.first
			this.first = node
		}

		this.length++
	}
}
