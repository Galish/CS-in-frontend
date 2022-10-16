import BinarySearchTree from './binary-search-tree'

export default class BinaryTreeSet {
	constructor(arr = []) {
		this.tree = new BinarySearchTree()

		for (const value of arr) {
			this.tree.insert(value, true)
		}
	}

	has(value) {
		const node = this.tree.find(value)

		return node !== undefined && node.value === true
	}
}
