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

	popFirst() {
		if (this.first === null) {
			throw new Error('List is empty')
		}

		const node = this.first
		this.first = node.next

		if (this.first !== null) {
			this.first.prev = null
		}

		if (this.length === 1) {
			this.last = null
		}

		this.length--

		return node.value
	}

	popLast() {
		if (this.last === null) {
			throw new Error('List is empty')
		}

		const node = this.last

		this.last = node.prev

		if (this.last !== null) {
			this.last.next = null
		}

		if (this.length === 1) {
			this.first = null
		}

		this.length--

		return node.value
	}

	pop(value) {
		const node = this.find(value)

		if (node == null) {
			return null
		}

		if (this.first === node) {
			this.popFirst()
			return node
		}

		if (this.last === node) {
			this.popLast()
			return node
		}

		node.prev.next = node.next
		node.next.prev = node.prev
		node.next = null
		node.prev = null

		this.length--

		return node.value
	}

	find(value) {
		let current = this.first

		while (current != null) {
			if (current.value === value) {
				return current
			}

			current = current.next
		}

		return null
	}

	print() {
		let current = this.first

		while(current != null) {
			console.log(current.value)
			current = current.next
		}
	}

	values() {
		let current = this.first

		return {
			[ Symbol.iterator ]() {
				return this
			},

			next() {
				if (current === null) {
					return {
						done: true
					}
				}

				const { value } = current

				current = current.next

				return {
					value,
					done: false
				}
			}
		}
	}

	reverse() {
		let current = this.last

		return {
			[ Symbol.iterator ]() {
				return this
			},

			next() {
				if (current === null) {
					return {
						done: true
					}
				}

				const { value } = current

				current = current.prev

				return {
					value,
					done: false
				}
			}
		}
	}
}
