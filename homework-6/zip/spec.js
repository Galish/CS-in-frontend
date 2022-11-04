import zip from './zip'

describe('Zip iterator', () => {

	it('Accepts empty input', () => {
		expect([ ...zip() ]).toEqual([])
	})

	it('Accepts empty array', () => {
		expect([ ...zip([]) ]).toEqual([])
	})

	it('Accepts an array', () => {
		const result = Array.from(zip([ 1, 2 ]))
		const expected = [ [ 1 ], [ 2 ] ]

		expect(result).toEqual(expected)
	})

	it('Ignores ignores non-iterable entities', () => {
		const result = Array.from(
			zip(
				{ a: 1, b: 2 },
				[ 1, 2 ],
				123,
				[ 3, 4 ]
			)
		)

		const expected = [ [ 1, 3 ], [ 2, 4 ] ]

		expect(result).toEqual(expected)
	})

	it('Iterates over multiple arrays', () => {
		const result = Array.from(
			zip(
				[ 1, 2 ],
				[ 3, 4 ]
			)
		)

		const expected = [ [ 1, 3 ], [ 2, 4 ] ]

		expect(result).toEqual(expected)
	})

	it('Iterates over multiple iterables', () => {
		const result = Array.from(
			zip(
				[ 1, 2 ],
				new Set([ 3, 4 ]),
				'bla'
			)
		)

		const expected = [
			[ 1, 3, 'b' ],
			[ 2, 4, 'l' ],
			[ 'a' ]
		]

		expect(result).toEqual(expected)
	})

})
