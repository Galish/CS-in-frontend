import enumerate from './enumerate'
import random from '../random-generator/random'
import take from '../take/take'

describe('Enumerate iterable', () => {

	it('Throws an error when passing no input', () => {
		expect(() => enumerate()).toThrow('Object is not iterable')
	})

	it('Throws an error when passing non-iterable input', () => {
		const nonIterable = { foo: 123 }

		expect(() => enumerate(nonIterable)).toThrow('Object is not iterable')
	})

	it('Doesn\'t throw an error when passing iterable input', () => {
		const iterable = [ 1, 2, 3, 4, 5 ]

		expect(() => enumerate(iterable)).not.toThrow('Object is not iterable')
	})

	it('Returns an iterator of the paired iteration number and value', () => {
		const randomInt = random(10, 25)
		const enumerable = [ ...take(enumerate(randomInt), 10) ]

		for (let i = 0; i < enumerable.length; i++) {
			expect(enumerable[ i ].length).toBe(2)
			expect(enumerable[ i ][ 0 ]).toBe(i)
		}
	})

})
