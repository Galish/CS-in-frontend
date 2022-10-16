export default class DynamicArray {
	constructor(capacity = 3) {
		this.arr = new Array(capacity)
		this.capacity = capacity
		this.length = 0
	}

	add(value) {
		if (this.length < this.capacity) {
			this.arr[ this.length++ ] = value
		} else {
			this.capacity = this.capacity * 2
			const newArr = new Array(this.capacity)

			for (const index in this.arr) {
				newArr[ index ] = this.arr[ index ]
			}

			this.arr = newArr
			this.arr[ this.length++ ] = value
		}
	}

	get(index) {
		return this.arr[ index ]
	}

	*[ Symbol.iterator ]() {
		yield* this.arr
	}
}
