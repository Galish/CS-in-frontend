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

	print() {
		let current = this.first

		while(current != null) {
			console.log(current.value)
			current = current.next
		}
	}

	get reverse() {
		const _this = this

		return {
			*[ Symbol.iterator ]() {
				let current = _this.last

				while(current != null) {
					yield current.value
					current = current.prev
				}
			}
		}
	}

	*[ Symbol.iterator ]() {
		let current = this.first

		while(current != null) {
			yield current.value
			current = current.next
		}
	}
}
