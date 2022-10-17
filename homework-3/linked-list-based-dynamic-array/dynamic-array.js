import LinkedList from './linked-list'

export default class DynamicArray {
	constructor(size = 3) {
		this.arraySize = size
		this.list = new LinkedList()
		this.list.addLast(new Array(this.arraySize))
		this.length = 0
	}

	add(value) {
		if (this.list.last.size < this.arraySize) {
			this.list.last.arr[ this.list.last.size ] = value
		} else {
			const arr = new Array(this.arraySize)
			arr[ 0 ] = value

			this.list.addLast(arr)
		}

		this.list.last.size++
		this.length++
	}

	get(index) {
		let node = this.list.first

		while (node) {
			if (index < node.size) {
				return node.arr[ index ]
			}

			index -= node.size
			node = node.next
		}
	}

	values() {
		function* intoIter(list) {
			let node = list.first

			while (node) {
				yield* node.arr
				node = node.next
			}
		}

		const iter = intoIter(this.list)

		return {
			[ Symbol.iterator ]() {
				return this
			},

			next() {
				return iter.next()
			}
		}
	}
}
