import jest from 'jest-mock'

import LinkedList from './linked-list'

describe('Doubly linked list', () => {

	it('should create list instance', () => {
		const list = new LinkedList()

		expect(list).toBeInstanceOf(LinkedList)
	})

	it('should create empty list', () => {
		const list = new LinkedList()

		expect(list.length).toEqual(0)
	})

	it('should return the list length', () => {
		const list = new LinkedList()

		expect(list.length).toBe(0)

		list.addFirst(1)
		expect(list.length).toBe(1)

		list.addFirst(2)
		list.addFirst(3)

		expect(list.length).toBe(3)

		list.popFirst()

		expect(list.length).toBe(2)

		list.popLast()

		expect(list.length).toBe(1)
	})

	it('should put value to the head of the list', () => {
		const list = new LinkedList()

		list.addFirst(1)
		list.addFirst(2)
		list.addFirst(3)

		expect(list.first.value).toBe(3)
		expect(list.last.value).toBe(1)
		expect(list.first.next.value).toBe(2)
		expect(list.first.next.prev.value).toBe(3)
	})

	it('should put value to the end of the list', () => {
		const list = new LinkedList()

		list.addLast(1)
		list.addLast(2)
		list.addLast(3)
		list.addLast(4)
		list.addLast(5)

		expect(list.first.value).toBe(1)
		expect(list.last.value).toBe(5)
		expect(list.first.next.value).toBe(2)
		expect(list.first.next.prev.value).toBe(1)
	})

	it('should remove the first value from the list', () => {
		const list = new LinkedList()

		list.addFirst(1)
		list.addLast(2)
		list.addFirst(3)
		list.popFirst()
		list.addFirst(4)
		list.addLast(5)
		list.popFirst()

		expect(list.first.value).toBe(1)
		expect(list.last.value).toBe(5)
		expect(list.first.next.value).toBe(2)
		expect(list.first.next.prev.value).toBe(1)
	})

	it('should throw an exception when removing the first value from the list', () => {
		const list = new LinkedList()

		list.addFirst(1)
		list.addLast(2)

		expect(() => list.popFirst()).not.toThrow()
		expect(() => list.popFirst()).not.toThrow()

		expect(list.first).toBeNull()
		expect(list.last).toBeNull()

		expect(() => list.popFirst()).toThrow('List is empty')
	})

	it('should remove the last value from the list', () => {
		const list = new LinkedList()

		list.addFirst(1)
		list.addFirst(2)
		list.popLast()
		list.addLast(3)
		list.addLast(4)
		list.addLast(5)
		list.popLast()

		expect(list.first.value).toBe(2)
		expect(list.last.value).toBe(4)
		expect(list.first.next.value).toBe(3)
		expect(list.first.next.prev.value).toBe(2)
	})

	it('should throw an exception when removing the last value from the list', () => {
		const list = new LinkedList()

		list.addFirst(1)
		list.addLast(2)

		expect(() => list.popLast()).not.toThrow()
		expect(() => list.popLast()).not.toThrow()

		expect(list.first).toBeNull()
		expect(list.last).toBeNull()

		expect(() => list.popLast()).toThrow('List is empty')
	})

	it('should return removed value from the list', () => {
		const list = new LinkedList()

		list.addFirst(3)
		list.addFirst(2)
		list.addFirst(1)
		list.addLast(4)
		list.addLast(5)

		expect(list.popFirst()).toBe(1)
		expect(list.popFirst()).toBe(2)
		expect(list.popLast()).toBe(5)
	})

	it('should print a content of the list', () => {
		const spyFn = jest.spyOn(console, 'log');

		const list = new LinkedList()

		list.addFirst(3)
		list.addFirst(2)
		list.addFirst(1)
		list.addLast(4)
		list.addLast(5)

		list.print()

		expect(spyFn).toHaveBeenNthCalledWith(1, 1)
		expect(spyFn).toHaveBeenNthCalledWith(2, 2)
		expect(spyFn).toHaveBeenNthCalledWith(3, 3)
		expect(spyFn).toHaveBeenNthCalledWith(4, 4)
		expect(spyFn).toHaveBeenNthCalledWith(5, 5)
	})

	it('should implement the iterable API', () => {
		const list = new LinkedList()

		list.addFirst(3)
		list.addFirst(2)
		list.addFirst(1)
		list.addLast(4)
		list.addLast(5)

		expect(typeof list[ Symbol.iterator ]).toBe('function')
		expect([ ...list ]).toEqual([ 1, 2, 3, 4, 5 ])
	})

	it('should implement the iterable API (reversed)', () => {
		const list = new LinkedList()

		list.addFirst(3)
		list.addFirst(2)
		list.addFirst(1)
		list.addLast(4)
		list.addLast(5)

		expect(typeof list.reverse[ Symbol.iterator ]).toBe('function')
		expect([ ...list.reverse ]).toEqual([ 5, 4, 3, 2, 1 ])
	})

})
