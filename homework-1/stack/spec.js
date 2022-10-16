import Stack from './stack'

describe('Fixed size array based Stack', () => {

	it('should create stack instance', () => {
		const stack = new Stack()

		expect(stack).toBeInstanceOf(Stack)
	})

	it('should create empty stack', () => {
		const stack = new Stack()

		expect(stack.length).toEqual(0)
	})

	it('should return the stack length', () => {
		const stack = new Stack()

		stack.push(10)
		stack.push(11)
		stack.push(12)

		expect(stack.length).toEqual(3)
	})

	it('should put and remove values from the stack', () => {
		const stack = new Stack()

		stack.push(10)
		stack.push(11)
		stack.push(12)

		expect(stack.pop()).toEqual(12)
		expect(stack.pop()).toEqual(11)
		expect(stack.pop()).toEqual(10)
	})

	it('should throw an exception when removing from an empty stack', () => {
		const stack = new Stack()

		stack.push(10)
		stack.push(11)

		expect(stack.pop()).toEqual(11)
		expect(stack.pop()).toEqual(10)
		expect(() => stack.pop()).toThrow('Stack is empty')
	})

})
