import random from '../random-generator/random'
import take from './take'

describe('Take iterable', () => {

	it('Throws an error when passing no input', () => {
		expect(() => take()).toThrow('Object is not iterable')
	})

	it('Throws an error when passing non-iterable input', () => {
		const nonIterable = { foo: 123 }

		expect(() => take(nonIterable, 10)).toThrow('Object is not iterable')
	})

	it('Doesn\'t throw an error when passing iterable input', () => {
		const iterable = [ 1, 2, 3, 4, 5 ]

		expect(() => take(iterable, 10)).not.toThrow()
	})

	it('Takes the specified number of items', () => {
		const randomInt = random(10, 15)

		expect([ ...take(randomInt, 3) ].length).toBe(3)
	})

})
