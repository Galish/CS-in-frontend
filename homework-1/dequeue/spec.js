import Dequeue from './dequeue'

describe('Linked list based Dequeue', () => {
	it('should create double-ended queue instance', () => {
		const dequeue = new Dequeue()

		expect(dequeue).toBeInstanceOf(Dequeue)
	})

	it('should create empty double-ended queue', () => {
		const dequeue = new Dequeue()

		expect(dequeue.length).toEqual(0)
	})

	it('should return the double-ended queue length', () => {
		const dequeue = new Dequeue()

		dequeue.push(11)
		dequeue.unshift(11)
		dequeue.push(12)
		dequeue.unshift(10)

		expect(dequeue.length).toEqual(4)
	})

	it('should put and remove values from the double-ended queue', () => {
		const dequeue = new Dequeue()

		dequeue.push(12)
		dequeue.push(13)
		dequeue.unshift(11)
		dequeue.unshift(10)
		dequeue.push(14)

		expect(dequeue.pop()).toEqual(14)
		expect(dequeue.shift()).toEqual(10)
		expect(dequeue.shift()).toEqual(11)
		expect(dequeue.pop()).toEqual(13)
		expect(dequeue.pop()).toEqual(12)
	})

	it('should throw an exception when removing from an empty double-ended queue', () => {
		const dequeue = new Dequeue()

		dequeue.unshift(10)
		dequeue.push(11)

		expect(dequeue.pop()).toEqual(11)
		expect(dequeue.pop()).toEqual(10)

		expect(() => dequeue.shift()).toThrow('Queue is empty')
		expect(() => dequeue.pop()).toThrow('Queue is empty')
	})
})
