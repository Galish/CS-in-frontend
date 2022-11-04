import mapSeq from './map-seq'

describe('Sequence Map iterator', () => {

	it('Throws an error when passing no input', () => {
		expect(() => mapSeq()).toThrow('Object is not iterable')
	})

	it('Throws an error when passing non-iterable input', () => {
		const nonIterable = { foo: 123 }

		expect(() => mapSeq(nonIterable)).toThrow('Object is not iterable')
	})

	it('Returs an iterable with initial values', () => {
		const result = Array.from(
			mapSeq([ 1, 2, 3, 4, 5 ])
		)

		expect(result).toEqual([ 1, 2, 3, 4, 5 ])
	})

	it('Returs an iterable with modified values', () => {
		const result = Array.from(
			mapSeq(
				[ 1, 2, 3 ],
				[
					(el) => el * 2,
					(el) => el - 1
				]
			)
		)

		expect(result).toEqual([ 1, 3, 5 ])
	})

})
