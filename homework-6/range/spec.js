import Range from './range'

describe('Symbol range iterator', () => {

	it('#1', () => {
		const symbolRange = new Range('a', 'f')
		const result = Array.from(symbolRange)
		const expected = [ 'a', 'b', 'c', 'd', 'e', 'f' ]

		expect(result).toEqual(expected)
	})

	it('#2', () => {
		const numberRange = new Range(-5, 1)
		const result = Array.from(numberRange)
		const expected = [ -5, -4, -3, -2, -1, 0, 1 ]

		expect(result).toEqual(expected)
	})

	it('Reversed', () => {
		const numberRange = new Range(-5, 1)
		const result = Array.from(numberRange).reverse()
		const expected = [ 1, 0, -1, -2, -3, -4, -5 ]

		expect(result).toEqual(expected)
	})

})
