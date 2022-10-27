import format from './string-template'

describe('Format string using template', () => {
	it('#1', () => {
		const template = 'Hello!'
		const params = {
			user: 'Bob',
			age: 10
		}
		const str = format(template, params)

		expect(str).toBe('Hello!')
	})

	it('#2', () => {
		const template = 'Hello, ${user}! Your age is ${age}.'
		const params = {
			user: 'Bob',
			age: 10
		}
		const str = format(template, params)

		expect(str).toBe('Hello, Bob! Your age is 10.')
	})

	it('#3', () => {
		const template = 'Hello, ${user}! Your age is ${age}.'
		const params = {
			name: 'Bob',
			age: 10
		}
		const str = format(template, params)

		expect(str).toBe('Hello, ! Your age is 10.')
	})
})
