import jest from 'jest-mock'
import EventEmitter, { EventEmitterChain } from './event-emitter'

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

	describe('Event delegation', () => {

		it('should delegate events to parent emitter', () => {
			const spyFn = jest.fn()
			const parentEE = new EventEmitterChain()
			const ee = new EventEmitterChain(parentEE)

			parentEE.on('someEvent', spyFn)

			ee.emit('someEvent', 42)
			ee.emit('someEvent')
			ee.emit('someEvent', 'some', 'text')

			parentEE.off('someEvent', spyFn)

			ee.emit('someEvent')

			expect(spyFn).toHaveBeenCalledTimes(3)
		})

		it('should trigger events at all levels', () => {
			const spyFn = jest.fn()
			const spyParentFn = jest.fn()
			const parentEE = new EventEmitterChain()
			const ee = new EventEmitterChain(parentEE)

			ee.on('someEvent', spyFn)
			parentEE.on('someEvent', spyParentFn)

			ee.emit('someEvent', 42)
			ee.emit('someEvent')

			parentEE.off('someEvent', spyParentFn)

			ee.emit('someEvent', 'some', 'text')
			ee.off('someEvent', spyFn)

			expect(spyFn).toHaveBeenCalledTimes(3)
			expect(spyParentFn).toHaveBeenCalledTimes(2)
		})

		it('should pass arguments to parent emitter', () => {
			const spyFn = jest.fn(({ data }) => {
				if (isIter(data)) {
					return Array.from(data)
				}

				return data
			})
			const parentEE = new EventEmitterChain()
			const ee = new EventEmitterChain(parentEE)

			parentEE.on('someEvent', spyFn)

			ee.emit('someEvent', 42)
			ee.emit('someEvent')
			ee.emit('someEvent', 'some', 'text')

			parentEE.off('someEvent', spyFn)

			expect(spyFn).toHaveBeenNthCalledWith(
				1,
				{
					data: 42,
					stopPropagation: expect.any(Function),
					target: ee
				}
			)

			expect(spyFn).toHaveBeenNthCalledWith(
				2,
				{
					data: undefined,
					stopPropagation: expect.any(Function),
					target: ee
				}
			)

			expect(spyFn).toHaveBeenNthCalledWith(
				3,
				{
					data: expect.objectContaining({
						[ Symbol.iterator ]: expect.any(Function)
					}),
					stopPropagation: expect.any(Function),
					target: ee
				}
			)

			expect(spyFn).toHaveNthReturnedWith(1, 42)
			expect(spyFn).toHaveNthReturnedWith(2, undefined)
			expect(spyFn).toHaveNthReturnedWith(3, [ 'some', 'text' ])
		})

		it('should stop event propagation', () => {
			const spyFn = jest.fn(e => e.stopPropagation())
			const spyParentFn = jest.fn()
			const parentEE = new EventEmitterChain()
			const ee = new EventEmitterChain(parentEE)

			ee.on('someEvent', spyFn)
			parentEE.on('someEvent', spyParentFn)

			ee.emit('someEvent', 42)
			ee.emit('someEvent')

			ee.off('someEvent', spyFn)
			ee.emit('someEvent', 'some', 'text')

			parentEE.off('someEvent', spyParentFn)

			expect(spyFn).toHaveBeenCalledTimes(2)
			expect(spyParentFn).toHaveBeenCalledTimes(1)
		})

		it('should stream events to parent emitter', done => {
			const spyFn = jest.fn()
			const spyParentFn = jest.fn()
			const parentEE = new EventEmitterChain()
			const ee = new EventEmitterChain(parentEE)
			const stream = ee.on('someEvent');
			const parentStream = ee.on('someEvent');

			// console.log('->stream:', stream);

			(async () => {
				for await (const e of parentStream) {
					spyParentFn(e)
				}
			})();

			(async () => {
				for await (const e of stream) {
					spyFn(e)
				}

				done()

				expect(spyFn).toHaveBeenCalledTimes(3)
				expect(spyParentFn).toHaveBeenCalledTimes(2)
			})();

			ee.emit('someEvent', 'some data')
			ee.emit('someEvent', 1, 2, 3)

			parentStream.off()

			ee.emit('someEvent')

			stream.off()
		})

	})

})

function isIter(obj = {}) {
	return typeof obj?.next === 'function'
}