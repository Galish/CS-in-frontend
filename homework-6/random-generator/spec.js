import random from './random'

describe('Random numbers generator', () => {

	it('Returns an iterable', () => {
		const randomInt = random(0, 100)

		expect(typeof randomInt[ Symbol.iterator ]).toBe('function')
	})

	it('Generates infinite iterator', () => {
		const randomInt = random(10, 30)

		expect(randomInt.next().done).toBe(false)
		expect(randomInt.next().done).toBe(false)
		expect(randomInt.next().done).toBe(false)
		expect(randomInt.next().done).toBe(false)
		expect(randomInt.next().done).toBe(false)
		expect(randomInt.next().done).toBe(false)
		expect(randomInt.next().done).toBe(false)

	})

	it('Generates numbers in specific ranges', () => {
		const randomInt = random(10, 25)

		let limit = 25
		for (const value of randomInt) {
			if (limit === 0) {
				break
			}

			expect(value).toBeGreaterThanOrEqual(10)
			expect(value).toBeLessThanOrEqual(25)

			limit--
		}
	})

})
