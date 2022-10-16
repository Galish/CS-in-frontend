import jest from 'jest-mock'

import DynamicArray from './dynamic-array'

describe('Linked list based dynamic array', () => {

	it('should create dynamic array instance', () => {
		const dynamicArray = new DynamicArray()

		expect(dynamicArray).toBeInstanceOf(DynamicArray)
	})

	it('should create empty array', () => {
		const dynamicArray = new DynamicArray()

		expect(dynamicArray.length).toEqual(0)
	})

	it('should put value to array', () => {
		const dynamicArray = new DynamicArray(3)

		dynamicArray.add(1)
		dynamicArray.add(2)
		dynamicArray.add(3)
		dynamicArray.add(4)
		dynamicArray.add(5)

		expect(dynamicArray.length).toBe(5)
	})

	it('should get value by index', () => {
		const dynamicArray = new DynamicArray(3)

		dynamicArray.add(1)
		dynamicArray.add(2)
		dynamicArray.add(3)
		dynamicArray.add(4)
		dynamicArray.add(5)

		expect(dynamicArray.get(0)).toBe(1)
		expect(dynamicArray.get(1)).toBe(2)
		expect(dynamicArray.get(2)).toBe(3)
		expect(dynamicArray.get(3)).toBe(4)
		expect(dynamicArray.get(4)).toBe(5)
		expect(dynamicArray.get(5)).toBe(undefined)
	})

	it('should implement the iterable API', () => {
		const dynamicArray = new DynamicArray(2)

		dynamicArray.add(1)
		dynamicArray.add(2)
		dynamicArray.add(3)
		dynamicArray.add(4)
		dynamicArray.add(5)

		expect(typeof dynamicArray[ Symbol.iterator ]).toBe('function')
		expect([ ...dynamicArray ]).toEqual([ 1, 2, 3, 4, 5 ])
	})
})
