import promisify from './promisify'

const mockSum = (a, b, cb) => {
	const res = a + b

	if (isNaN(res)) {
		cb(new Error('Result is not a number'), null)
	} else {
		cb(null, res)
	}
}

describe('Thunk-callback function promisify', () => {

	it('throws an error', () => {
		expect(() => promisify({})).toThrow('Pass the function');
	})

	it('resolves a promise with data', () => {
		const mockSumPromise = promisify(mockSum)

		expect(mockSumPromise(10, 20)).resolves.toBe(30)
	})

	it('rejects a promise with an error', () => {

		const mockSumPromise = promisify(mockSum)

		expect(mockSumPromise(10, 'abc')).rejects.toThrow('Result is not a number')
	})

})
