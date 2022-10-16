import jest from 'jest-mock'

import binarySearch from './binary-search'

const array = [ -432, 0, 1, 1, 2, 2, 2, 3, 4, 5, 6, 98 ]

describe('Array binary search', () => {

	it('should find value index', () => {
		expect(binarySearch(4, array)).toBe(8)
	})

	it('should find value index', () => {
		expect(binarySearch(0, array)).toBe(1)
	})

	it('should find value index', () => {
		expect(binarySearch(-432, array)).toBe(0)
	})

	it('shouldn\'t find value index', () => {
		expect(binarySearch(250, array)).toBe(undefined)
	})

	it('shouldn\'t find value index', () => {
		expect(binarySearch(250)).toBe(undefined)
	})

})
