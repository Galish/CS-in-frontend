import Queue from './queue'

describe('Linked list based Queue', () => {

	it('should create queue instance', () => {
		const queue = new Queue()

		expect(queue).toBeInstanceOf(Queue)
	})

	it('should create empty queue', () => {
		const queue = new Queue()

		expect(queue.length).toEqual(0)
	})

	it('should return the queue length', () => {
		const queue = new Queue()

		queue.push(10)
		queue.push(11)
		queue.push(12)

		expect(queue.length).toEqual(3)
	})

	it('should put and remove values from the queue', () => {
		const queue = new Queue()

		queue.push(10)
		queue.push(11)
		queue.push(12)

		expect(queue.pop()).toEqual(10)
		expect(queue.pop()).toEqual(11)
		expect(queue.pop()).toEqual(12)
	})

	it('should throw an exception when removing from an empty queue', () => {
		const queue = new Queue()

		queue.push(10)
		queue.push(11)

		expect(queue.pop()).toEqual(10)
		expect(queue.pop()).toEqual(11)
		expect(() => queue.pop()).toThrow('Queue is empty')
	})

})
