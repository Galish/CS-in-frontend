import Node from './node'

export default class BinarySearchTree {
	constructor() {
		this.root = null
	}

	find(key) {
		let currentNode = this.root

		while (currentNode != null) {
			if (currentNode.value.key === key) {
				return currentNode.value
			}

			if (key < currentNode.value.key) {
				currentNode = currentNode.leftChild
			} else {
				currentNode = currentNode.rightChild
			}
		}
	}

	insert(key, value) {
		const newNode = new Node({ key, value })

		// Empty tree
		if (this.root === null) {
			return this.root = newNode
		}

		let currentNode = this.root

		while (true) {
			const parentNode = currentNode

			if (key < currentNode.value.key) {
				currentNode = currentNode.leftChild

				if (currentNode == null) {
					parentNode.leftChild = newNode
					return
				}
			} else {
				currentNode = currentNode.rightChild

				if (currentNode == null) {
					parentNode.rightChild = newNode
					return
				}
			}
		}
	}

	// delete(value) {
	// TODO: implement
	// }

	dfsInOrder() {
		function* inOrderIter(node) {
			if (node != null) {
				yield* inOrderIter(node.leftChild)
				yield node.value.key
				yield* inOrderIter(node.rightChild)
			}
		}

		const iter = inOrderIter(this.root)

		return {
			[ Symbol.iterator ]() {
				return this
			},

			next() {
				return iter.next()
			}
		}
	}

	dfsPreOrder() {
		function* preOrderIter(node) {
			if (node != null) {
				yield node.value.key
				yield* preOrderIter(node.leftChild)
				yield* preOrderIter(node.rightChild)
			}
		}

		const iter = preOrderIter(this.root)

		return {
			[ Symbol.iterator ]() {
				return this
			},

			next() {
				return iter.next()
			}
		}
	}

	dfsPostOrder() {
		function* postOrderIter(node) {
			if (node != null) {
				yield* postOrderIter(node.leftChild)
				yield* postOrderIter(node.rightChild)
				yield node.value.key
			}
		}

		const iter = postOrderIter(this.root)

		return {
			[ Symbol.iterator ]() {
				return this
			},

			next() {
				return iter.next()
			}
		}
	}

	bfs() {
		const queue = [ this.root ]

		function* intoIter() {
			while (queue.length > 0) {
				const node = queue.shift()

				if (node.leftChild != null) {
					queue.push(node.leftChild)
				}

				if (node.rightChild != null) {
					queue.push(node.rightChild)
				}

				yield node.value.key
			}
		}

		const iter = intoIter()

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
