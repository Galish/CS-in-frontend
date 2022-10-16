import BinaryTreeSet from './binary-tree-set'

describe('Binary tree set', () => {

	it('should create set instance', () => {
		const treeSet = new BinaryTreeSet()

		expect(treeSet).toBeInstanceOf(BinaryTreeSet)
	})

	it('should find value', () => {
		const treeSet = new BinaryTreeSet([ -432, 0, 1, 1, 2, 2, 2, 3, 4, 5, 6, 98 ])

		expect(treeSet.has(53)).toBe(false)
	})

	it('shouldn\'t find value', () => {
		const treeSet = new BinaryTreeSet([ -432, 0, 1, 1, 2, 2, 2, 3, 4, 5, 6, 98 ])

		expect(treeSet.has(98)).toBe(true)
	})

})
