import filter from './filter'
import random from '../random-generator/random'
import take from '../take/take'

describe('Filter iterable', () => {

	it('Throws an error when passing no input', () => {
		expect(() => filter()).toThrow('Object is not iterable')
	})

	it('Throws an error when passing non-iterable input', () => {
		const nonIterable = { foo: 123 }

		expect(() => filter(nonIterable)).toThrow('Object is not iterable')
	})

	it('Throws an error if no predicate is passed', () => {
		const randomInt = random(10, 15)

		expect(() => filter(randomInt)).toThrow('Predicate must be a function')
	})

	it('Doesn\'t throw an error when passing iterable input', () => {
		const iterable = [ 1, 2, 3, 4, 5 ]

		expect(() => filter(iterable)).not.toThrow('Object is not iterable')
	})

	it('Doesn\'t throw an error when passed predicate', () => {
		const randomInt = random(10, 15)

		expect(
			() => filter(randomInt, () => {})
		).not.toThrow('Predicate must be a function')
	})

	it('Returns an iterator of values satisfying the predicate', () => {
		const randomInt = random(10, 25)
		const predicate = el => el > 20
		const filtered = [ ...take(filter(randomInt, predicate), 50) ]

		expect(filtered.every(predicate))
	})

})
