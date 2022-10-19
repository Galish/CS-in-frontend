import iter from './symbol-iterator'

describe('String symbol iterator', () => {

	it('Iterating over am empty string', () => {
		expect(typeof iter()[ Symbol.iterator ]).toBe('function')
		expect([ ...iter() ]).toEqual([])
	})

	it('Iterating over a text string', () => {
		const input = 'Some string!'

		expect(typeof iter(input)[ Symbol.iterator ]).toBe('function')
		expect([ ...iter(input) ]).toEqual([ ...input ])
	})

	it('Iterating over a reman numeric string', () => {
		const input = 'ⅫⅦ'

		expect(typeof iter(input)[ Symbol.iterator ]).toBe('function')
		expect([ ...iter(input) ]).toEqual([ ...input ])
	})

	it('Iterating over a mixed string', () => {
		const input = '012a456789'

		expect(typeof iter(input)[ Symbol.iterator ]).toBe('function')
		expect([ ...iter(input) ]).toEqual([ ...input ])
	})

	it('Iterating over an emoji containing string', () => {
		const input = '👩‍❤️‍💋‍👩'

		expect(typeof iter(input)[ Symbol.iterator ]).toBe('function')
		expect([ ...iter(input) ]).toEqual([ ...input ])
	})

})
