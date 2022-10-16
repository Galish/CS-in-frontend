import BinarySearchTree from './binary-search-tree'

describe('Binary search tree', () => {

	it('should create tree instance', () => {
		const tree = new BinarySearchTree()

		expect(tree).toBeInstanceOf(BinarySearchTree)
	})

	it('should find node by key', () => {
		const tree = new BinarySearchTree()

		tree.insert(8, '8')
		tree.insert(10, '10')
		tree.insert(3, '3')
		tree.insert(14, '14')
		tree.insert(1, '1')
		tree.insert(6, '6')
		tree.insert(13, '13')
		tree.insert(4, '4')
		tree.insert(7, '7')

		expect(tree.find(7).value).toBe('7')
	})

	it('shouldn\'t find node by key', () => {
		const tree = new BinarySearchTree()

		tree.insert(8, '8')
		tree.insert(10, '10')
		tree.insert(3, '3')
		tree.insert(14, '14')
		tree.insert(1, '1')
		tree.insert(6, '6')
		tree.insert(13, '13')
		tree.insert(4, '4')
		tree.insert(7, '7')

		expect(tree.find(20)).toBeUndefined()
	})

	it('depth first inorder traversal', () => {

		const tree = new BinarySearchTree()

		tree.insert(8, '8')
		tree.insert(10, '10')
		tree.insert(3, '3')
		tree.insert(14, '14')
		tree.insert(1, '1')
		tree.insert(6, '6')
		tree.insert(13, '13')
		tree.insert(4, '4')
		tree.insert(7, '7')

		expect([ ...tree.dfsInOrder() ]).toEqual([ 1, 3, 4, 6, 7, 8, 10, 13, 14 ])
	})

	it('depth first preorder traversal', () => {

		const tree = new BinarySearchTree()

		tree.insert(8, '8')
		tree.insert(10, '10')
		tree.insert(3, '3')
		tree.insert(14, '14')
		tree.insert(1, '1')
		tree.insert(6, '6')
		tree.insert(13, '13')
		tree.insert(4, '4')
		tree.insert(7, '7')

		expect([ ...tree.dfsPreOrder() ]).toEqual([ 8, 3, 1, 6, 4, 7, 10, 14, 13 ])
	})

	it('depth first postorder traversal', () => {

		const tree = new BinarySearchTree()

		tree.insert(8, '8')
		tree.insert(10, '10')
		tree.insert(3, '3')
		tree.insert(14, '14')
		tree.insert(1, '1')
		tree.insert(6, '6')
		tree.insert(13, '13')
		tree.insert(4, '4')
		tree.insert(7, '7')

		expect([ ...tree.dfsPostOrder() ]).toEqual([ 1, 4, 7, 6, 3, 13, 14, 10, 8 ])
	})

	it('breadth first traversal', () => {

		const tree = new BinarySearchTree()

		tree.insert(8, '8')
		tree.insert(10, '10')
		tree.insert(3, '3')
		tree.insert(14, '14')
		tree.insert(1, '1')
		tree.insert(6, '6')
		tree.insert(13, '13')
		tree.insert(4, '4')
		tree.insert(7, '7')

		expect([ ...tree.bfs() ]).toEqual([ 8, 3, 10, 1, 6, 14, 4, 7, 13 ])
	})

})
