import Node from './node'

export default class HashMap {
	constructor(size = 31) {
		this.arraySize = size
		this.arr = new Array(size)
	}

	hashFunc(key = '') {
		let hashValue = ''
		const arr = Array.from(key.toString())

		for (const char of arr) {
			const letter = char.codePointAt(0)

			// Horner's method
			hashValue = (hashValue * 27 + letter) % this.arraySize
		}

		return hashValue
	}

	set(key, value) {
		const index = this.hashFunc(key)
		const newNode = new Node({ key, value })

		if (this.arr[ index ] instanceof Node) {
			newNode.next = this.arr[ index ]
		}

		this.arr[ index ] = newNode
	}

	get(key) {
		let current = this.arr[ this.hashFunc(key) ]

		while (current != null) {
			if (current.value.key === key) {
				return current.value.value
			}

			current = current.next
		}
	}

	keys() {
		function* intoIter(arr) {
			for (const index in arr) {
				let node = arr[ index ]

				while (node != null) {
					yield node.value.key

					node = node.next
				}
			}
		}

		const iter = intoIter(this.arr)

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
