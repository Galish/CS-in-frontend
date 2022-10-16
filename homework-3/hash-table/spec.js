import jest from 'jest-mock'

import HashTable from './hash-table'

describe('Hash table', () => {

	it('should create dynamic array instance', () => {
		const hashTable = new HashTable()

		expect(hashTable).toBeInstanceOf(HashTable)
	})

	it('should set value', () => {
		const hashTable = new HashTable(3)

		hashTable.set('foo', 'bar')
		hashTable.set('bee', 'bar')
		hashTable.set('aaa', 'bar')
		hashTable.set(10, 'bla')

		expect(hashTable.get('foo')).toBe('bar')
		expect(hashTable.get(10)).toBe('bla')
	})

	it('should implement the iterable API for keys', () => {
		const hashTable = new HashTable(5)

		hashTable.set('foo', 'bar')
		hashTable.set('bee', 'bar')
		hashTable.set('aaa', 'bar')
		hashTable.set(10, 'bla')

		const keys = [ ...hashTable.keys() ]

		expect(keys.length).toBe(4)
		expect(keys.includes('foo')).toBe(true)
		expect(keys.includes('bee')).toBe(true)
		expect(keys.includes('aaa')).toBe(true)
		expect(keys.includes(10)).toBe(true)
	})

})
