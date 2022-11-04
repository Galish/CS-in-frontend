import seq from './seq'

describe('Sequence iterator', () => {

	it('Accepts empty input', () => {
		expect([ ...seq() ]).toEqual([])
	})

	it('Accepts empty array', () => {
		expect([ ...seq([]) ]).toEqual([])
	})

	it('Accepts an array', () => {
		expect([ ...seq([ 1, 2 ]) ]).toEqual([ 1, 2 ])
	})

	it('Ignores ignores non-iterable entities', () => {
		expect([ ...seq([ 1, 2 ], { a: 1, b: 2 }, 123) ]).toEqual([ 1, 2 ])
	})

	it('Iterates over multiple arrays', () => {
		expect([ ...seq([ 1, 2 ], [ 3, 4 ]) ]).toEqual([ 1, 2, 3, 4 ])
	})

	it('Iterates over multiple iterables', () => {
		expect([
			...seq([ 1, 2 ], new Set([3, 4]), 'bla')
		]).toEqual([ 1, 2, 3, 4, 'b', 'l', 'a' ])
	})

})
