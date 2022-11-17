import LRUCache from './lru'

describe('LRUCache', () => {

	it('#1', () => {
		const cache = new LRUCache(3)

		cache.set(1, '1')
		cache.set(2, '2')
		cache.set(3, '3')
		cache.set(4, '4')
		cache.set(5, '5')

		expect(cache.get(1)).toBe(undefined)
		expect(cache.get(2)).toBe(undefined)
		expect(cache.get(3)).toBe('3')
		expect(cache.get(4)).toBe('4')
		expect(cache.get(5)).toBe('5')
	})

	it('#2', () => {
		const cache = new LRUCache(3)

		cache.set(1, '1')
		cache.set(2, '2')
		cache.set(3, '3') 	// 1, 2, 3
		cache.get(1)		// 2, 3, 1
		cache.get(3)		// 2, 1, 3
		cache.set(4, '4')	// 1, 3, 4
		cache.get(1)		// 3, 4, 1
		cache.get(3)		// 4, 1, 3
		cache.set(5, '5')	// 1, 3, 5

		expect(cache.get(1)).toBe('1')
		expect(cache.get(2)).toBe(undefined)
		expect(cache.get(3)).toBe('3')
		expect(cache.get(4)).toBe(undefined)
		expect(cache.get(5)).toBe('5')
	})

	it('#3', () => {
		const cache = new LRUCache(3)

		const key1 = { key: 1 }
		const key2 = [ 1, 2, 3 ]
		const key3 = { a: 1, b: 2, c: 3 }
		const key4 = Symbol(4)
		const key5 = { key: 5 }

		cache.set(key3, '3')
		cache.set(key4, '4')
		cache.set(key5, '5') 	// 5, 4, 3
		cache.get(key4) 		// 4, 5, 3
		cache.get(key5) 		// 5, 4, 3
		cache.set(key1, '1')	// 1, 5, 4
		cache.get(key5) 		// 5, 1, 4
		cache.get(key4) 		// 4, 5, 1
		cache.set(key2, '2')	// 2, 4, 5


		expect(cache.get(key1)).toBe(undefined)
		expect(cache.get(key2)).toBe('2')
		expect(cache.get(key3)).toBe(undefined)
		expect(cache.get(key4)).toBe('4')
		expect(cache.get(key5)).toBe('5')
	})

})
