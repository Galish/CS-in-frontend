import LinkedList from './linked-list'

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

		if (!this.isList(this.arr[ index ])) {
			this.arr[ index ] = new LinkedList()
		}

		this.arr[ index ].addLast(key, value)
	}

	get(key) {
		const list = this.arr[ this.hashFunc(key) ]
		let node = list.first

		while (node != null) {
			if (node.key === key) {
				return node.value
			}

			node = node.next
		}
	}

	keys() {
		const arr = this.arr
		const isList = this.isList

		return {
			*[ Symbol.iterator ]() {
				for (const list of arr) {
					if (!isList(list)) {
						continue
					}

					let node = list.first

					while (node != null) {
						yield node.key

						node = node.next
					}
				}
			}
		}
	}

	isList(obj) {
		return obj instanceof LinkedList
	}
}
