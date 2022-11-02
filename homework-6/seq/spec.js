import seq from './seq'

describe('Sequence iterator', () => {

	it('#0', () => {
		expect([ ...seq() ]).toEqual([])
	})

	it('#1', () => {
		expect([ ...seq([]) ]).toEqual([])
	})

	it('#2', () => {
		expect([ ...seq([ 1, 2 ]) ]).toEqual([ 1, 2 ])
	})

	it('#3', () => {
		expect([ ...seq([ 1, 2 ], [ 3, 4 ]) ]).toEqual([ 1, 2, 3, 4 ])
	})

	// it('#3', () => {
	// 	expect([
	// 		...seq([ 1, 2 ], new Set([3, 4]), 'bla')
	// 	]).toEqual([ 1, 2, 3, 4, 'b', 'l', 'a' ])
	// })

})
