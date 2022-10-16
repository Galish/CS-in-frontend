import Node from './node'

export default class BinarySearchTree {
	constructor() {
		this.root = null
	}

	find(key) {
		let currentNode = this.root

		while (currentNode != null) {
			if (currentNode.key === key) {
				return currentNode
			}

			if (key < currentNode.key) {
				currentNode = currentNode.leftChild
			} else {
				currentNode = currentNode.rightChild
			}
		}
	}

	insert(key, value) {
		const newNode = new Node(key, value)

		// Empty tree
		if (this.root === null) {
			return this.root = newNode
		}

		let currentNode = this.root

		while (true) {
			const parentNode = currentNode

			if (key < currentNode.key) {
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

	// delete(value) {}

	dfsInOrder() {
		// Recoursion
		const root = this.root

		return {
			*[ Symbol.iterator ]() {

				function* inOrder(node) {
					if (node != null) {
						yield* inOrder(node.leftChild)
						yield node.key
						yield* inOrder(node.rightChild)
					}
				}

				yield* inOrder(root)
			}
		}

		// Stack
		/*
		const stack = []
		let current = this.root

		return {
			*[ Symbol.iterator ]() {
				while (current != null || stack.length > 0) {
					while (current != null) {
						stack.push(current)
						current = current.leftChild
					}

					current = stack.pop()

					yield current.key

					current = current.rightChild
				}
			}
		}
		*/
	}

	dfsPreOrder() {
		// Recursion
		const root = this.root

		return {
			*[ Symbol.iterator ]() {
				function* preOrder(node) {
					if (node != null) {
						yield node.key
						yield* preOrder(node.leftChild)
						yield* preOrder(node.rightChild)
					}
				}

				yield* preOrder(root)
			}
		}

		/*
		//Stack
		const stack = [ this.root ]

		return {
			*[ Symbol.iterator ]() {
				while (stack.length > 0) {
					const node = stack.pop()

					if (node.rightChild != null) {
						stack.push(node.rightChild)
					}

					if (node.leftChild != null) {
						stack.push(node.leftChild)
					}

					yield node.key
				}
			}
		}*/
	}

	dfsPostOrder() {
		const root = this.root

		return {
			*[ Symbol.iterator ]() {

				function* postOrder(node) {
					if (node != null) {
						yield* postOrder(node.leftChild)
						yield* postOrder(node.rightChild)
						yield node.key
					}
				}

				yield* postOrder(root)
			}
		}
	}

	bfs() {
		const queue = [ this.root ]

		return {
			*[ Symbol.iterator ]() {
				while (queue.length > 0) {
					const node = queue.shift()

					if (node.leftChild != null) {
						queue.push(node.leftChild)
					}

					if (node.rightChild != null) {
						queue.push(node.rightChild)
					}

					yield node.key
				}
			}
		}
	}
}
