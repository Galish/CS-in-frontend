import jest from 'jest-mock'

import SyncPromise from './sync-promise'
import sleep from '../sleep/sleep.js'

describe('SyncPromise', () => {

	it('Rejects synchronously', () => {
		const syncPromise = new SyncPromise((_, reject) => (
			reject(new Error('oops...'))
		))

		expect(syncPromise).rejects.toThrow('oops...')
	})

	it('Rejects synchronously', () => {
		const syncPromise = new SyncPromise((_, reject) => (
			reject(new Error('oops...'))
		)).catch(() => 'all good')

		expect(syncPromise).resolves.toBe('all good')
	})

	it('Resolves synchronously', () => {
		const syncPromise = SyncPromise.resolve('done!')

		expect(syncPromise).resolves.toBe('done!')
	})

	it('Rejects synchronously', () => {
		const syncPromise = SyncPromise.reject('oops...')

		expect(syncPromise).rejects.toThrow('oops...')
	})

	it('Rejects synchronously', () => {
		const syncPromise = SyncPromise.reject('oops...').catch(err => err)

		expect(syncPromise).resolves.toBe('oops...')
	})

	it('Resolves asynchronously', async () => {
		const syncPromise = new SyncPromise(resolve => (
			setTimeout(() => resolve('hello!'), 100)
		))

		await expect(syncPromise).resolves.toBe('hello!')
	})

	it('Rejects asynchronously', async () => {
		const syncPromise = new SyncPromise((_, reject) => (
			setTimeout(() => reject(new Error('oops...')), 100)
		))

		await expect(syncPromise).rejects.toThrow('oops...')
	})

	it('Logs promise chain first #1', () => {
		const spyFn = jest.spyOn(console, 'log').mockImplementation()

		SyncPromise.resolve('hello!!!').then(console.log)
		console.log('how are you???')

		expect(spyFn).toHaveBeenNthCalledWith(1, 'hello!!!')
		expect(spyFn).toHaveBeenNthCalledWith(2, 'how are you???')

		spyFn.mockRestore()
	})

	it('Logs promise chain first #2', () => {
		const spyFn = jest.spyOn(console, 'log').mockImplementation()

		new SyncPromise(resolve => resolve('hello!!!')).then(console.log)
		console.log('how are you???')

		expect(spyFn).toHaveBeenNthCalledWith(1, 'hello!!!')
		expect(spyFn).toHaveBeenNthCalledWith(2, 'how are you???')

		spyFn.mockRestore()
	})

	it('Logs promise chain first #3', () => {
		const spyFn = jest.spyOn(console, 'error').mockImplementation()

		SyncPromise.reject('hello!!!').catch(console.error)
		console.error('how are you???')

		expect(spyFn).toHaveBeenNthCalledWith(1, 'hello!!!')
		expect(spyFn).toHaveBeenNthCalledWith(2, 'how are you???')

		spyFn.mockRestore()
	})

	it('Logs promise chain first #4', () => {
		const spyFn = jest.spyOn(console, 'error').mockImplementation()

		new SyncPromise((_, reject) => reject('hello!!!')).catch(console.error)
		console.error('how are you???')

		expect(spyFn).toHaveBeenNthCalledWith(1, 'hello!!!')
		expect(spyFn).toHaveBeenNthCalledWith(2, 'how are you???')

		spyFn.mockRestore()
	})

	it('Logs promise chain first #5', async() => {
		const spyFn = jest.spyOn(console, 'log').mockImplementation()

		new SyncPromise(resolve => setTimeout(() => resolve('hello!!!'), 10))
			.then(console.log)

		console.log('how are you???')

		await sleep(10)

		expect(spyFn).toHaveBeenNthCalledWith(1, 'how are you???')
		expect(spyFn).toHaveBeenNthCalledWith(2, 'hello!!!')

		spyFn.mockRestore()
	})

	it('Logs promise chain first #6', async() => {
		const spyFn = jest.spyOn(console, 'error').mockImplementation()

		new SyncPromise((_, reject) => setTimeout(() => reject('hello!!!'), 10))
			.catch(console.error)

		console.error('how are you???')

		await sleep(10)

		expect(spyFn).toHaveBeenNthCalledWith(1, 'how are you???')
		expect(spyFn).toHaveBeenNthCalledWith(2, 'hello!!!')

		spyFn.mockRestore()
	})

})
