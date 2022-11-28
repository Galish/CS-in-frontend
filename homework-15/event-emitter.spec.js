import jest from 'jest-mock'
import EventEmitter from './event-emitter'

describe('Event emitter', () => {

	it('should trigger only one event', () => {
		const spyFn = jest.fn()
		const ee = new EventEmitter()

		ee.once('someEvent', spyFn)
		ee.emit('someEvent')
		ee.emit('someEvent')
		ee.emit('someEvent')

		expect(spyFn).toHaveBeenCalledTimes(1)
	})

	it('should trigger multiple events', () => {
		const spyFn = jest.fn()
		const ee = new EventEmitter()

		ee.on('someEvent', spyFn)
		ee.emit('someEvent')
		ee.emit('someEvent')
		ee.emit('someEvent')

		expect(spyFn).toHaveBeenCalledTimes(3)
	})

	it('should pass arguments', () => {
		const spyFn = jest.fn()
		const ee = new EventEmitter()

		ee.on('someEvent', spyFn)
		ee.emit('someEvent', 'some', 'data')
		ee.emit('someEvent', 1, 2, 3)
		ee.emit('someEvent')

		expect(spyFn).toHaveBeenNthCalledWith(1, 'some', 'data')
		expect(spyFn).toHaveBeenNthCalledWith(2, 1, 2, 3)
		expect(spyFn).toHaveBeenNthCalledWith(3)
	})

	it('should stop listening', () => {
		const spyFn = jest.fn()
		const ee = new EventEmitter()

		const off = ee.on('someEvent', spyFn)
		ee.emit('someEvent')
		ee.emit('someEvent')
		off()
		ee.emit('someEvent')

		expect(spyFn).toHaveBeenCalledTimes(2)
	})

	it('should stop listening', () => {
		const spyFn = jest.fn()
		const ee = new EventEmitter()

		ee.on('someEvent', spyFn)
		ee.emit('someEvent')
		ee.off('someEvent', spyFn)
		ee.emit('someEvent')
		ee.emit('someEvent')

		expect(spyFn).toHaveBeenCalledTimes(1)
	})

	it('should stop listening to the event', () => {
		const spyFn = jest.fn()
		const ee = new EventEmitter()

		ee.on('someEvent', spyFn)
		ee.emit('someEvent')
		ee.off('someEvent')
		ee.emit('someEvent')
		ee.emit('someEvent')

		expect(spyFn).toHaveBeenCalledTimes(1)
	})

	it('should stream events', done => {
		const spyFn = jest.fn()
		const ee = new EventEmitter()
		const stream = ee.on('someEvent');

		(async () => {
			for await (const e of stream) {
				spyFn(e)
			}

			done()

			expect(spyFn).toHaveBeenCalledTimes(3)
		})();
		
		ee.emit('someEvent')
		ee.emit('someEvent')
		ee.emit('someEvent')
		ee.off('someEvent')
		stream.off()
	})

	it('should stream events', done => {
		const spyFn = jest.fn(data => {
			if (isIter(data)) {
				return Array.from(data)
			}

			return data
		})

		const ee = new EventEmitter()
		const stream = ee.on('someEvent');

		(async () => {
			for await (const e of stream) {
				spyFn(e)
			}

			done()

			expect(spyFn).toHaveBeenCalledTimes(3)
		})();
		
		ee.emit('someEvent')
		ee.emit('someEvent')
		ee.emit('someEvent')
		stream.off()
		ee.emit('someEvent')
		ee.emit('someEvent')
		ee.off('someEvent')
	})

	it('should pass arguments to stream events', done => {
		const spyFn = jest.fn(data => {
			if (isIter(data)) {
				return Array.from(data)
			}

			return data
		})

		const ee = new EventEmitter()
		const stream = ee.on('someEvent');

		(async () => {
			for await (const e of stream) {
				spyFn(e)
			}

			done()

			expect(spyFn).toHaveBeenNthCalledWith(1, 'some data')
			expect(spyFn).toHaveBeenNthCalledWith(
				2,
				expect.objectContaining({
					[ Symbol.iterator ]: expect.any(Function)
				})
			)
			expect(spyFn).toHaveBeenNthCalledWith(3, undefined)

			expect(spyFn).toHaveNthReturnedWith(1, 'some data')
			expect(spyFn).toHaveNthReturnedWith(2, [ 1, 2, 3 ])
			expect(spyFn).toHaveNthReturnedWith(3, undefined)
		})();
		
		ee.emit('someEvent', 'some data')
		ee.emit('someEvent', 1, 2, 3)
		ee.emit('someEvent')
		ee.off('someEvent')
		stream.off()
	})

	it('should emit event to parent', () => {
		const spyFn = jest.fn(({ data }) => {
			if (isIter(data)) {
				return Array.from(data)
			}

			return data
		})
		const parentEE = new EventEmitter()
		const ee = new EventEmitter(parentEE)

		parentEE.on('someEvent', spyFn)

		ee.emit('someEvent', 42)
		ee.emit('someEvent')
		ee.emit('someEvent', 'some', 'text')

		parentEE.off('someEvent', spyFn)

		expect(spyFn).toHaveBeenNthCalledWith(
			1,
			{
				data: 42,
				target: ee
			}
		)

		expect(spyFn).toHaveBeenNthCalledWith(
			2,
			{
				data: undefined,
				target: ee
			}
		)

		expect(spyFn).toHaveBeenNthCalledWith(
			3,
			{
				data: expect.objectContaining({
					[ Symbol.iterator ]: expect.any(Function)
				}),
				target: ee
			}
		)

		expect(spyFn).toHaveNthReturnedWith(1, 42)
		expect(spyFn).toHaveNthReturnedWith(2, undefined)
		expect(spyFn).toHaveNthReturnedWith(3, [ 'some', 'text' ])
	})

})

function isIter(obj = {}) {
	return typeof obj?.next === 'function'
}