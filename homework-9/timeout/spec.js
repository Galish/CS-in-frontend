import timeout from './timeout'

describe('Promise timeout', () => {

	it('throws an error', () => {
		expect(() => timeout()).toThrow('Pass the promise');
	});

	it('resolves a promise', () => {
		const promise = new Promise(resolve => {
			setTimeout(() => resolve('Done!'), 100)
		});

		expect(timeout(promise, 1000)).resolves.toBe('Done!');
	});

	it('rejects a promise with timeout', () => {
		const promise = new Promise(resolve => {
			setTimeout(() => resolve('Done!'), 100)
		});

		expect(timeout(promise, 10)).rejects.toBe('Timeout exceeded');
	});

	it('resolves a promise if the timeout value matches', () => {
		const promise = new Promise(resolve => {
			setTimeout(() => resolve('Done!'), 100)
		});

		expect(timeout(promise, 100)).resolves.toBe('Done!');
	});

});
