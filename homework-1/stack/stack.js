export default class Stack {
	constructor(size = 10) {
		this.array = new Array(size)
		this.arraySize = size
		this.length = 0
	}

	get head() {
		return this.array[ this.length - 1 ]
	}

	get isEmpty() {
		return this.length === 0
	}

	get isFull() {
		return this.length === this.arraySize
	}

	push(value) {
		if (this.isFull) {
			throw new Error('Stack overflow')
		}

		this.array[ this.length++ ] = value
	}

	pop() {
		if (this.isEmpty) {
			throw new Error('Stack is empty')
		}

		return this.array[ --this.length ]
	}
}
