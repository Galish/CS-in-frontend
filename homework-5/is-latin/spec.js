import isLatin from './is-latin'

describe('Is valid latin string', () => {
	it('Validates empty string', () => {
		expect(isLatin()).toBeTruthy()
	})

	it('Validates number string', () => {
		expect(isLatin('12345')).toBeTruthy()
	})

	it('Validates latin string', () => {
		expect(isLatin('Hello')).toBeTruthy()
	})

	it('Validates latin string containing underscore symbol', () => {
		expect(isLatin('Hello_world')).toBeTruthy()
	})

	it('Validates latin string containing $ symbol', () => {
		expect(isLatin('$12345usd')).toBeTruthy()
	})

	it('#Validates latin string containing space', () => {
		expect(isLatin('Hello world')).toBeFalsy()
	})

	it('Validates latin string containing special character', () => {
		expect(isLatin('Hello_world!')).toBeFalsy()
	})

	it('Validates non latin string', () => {
		expect(isLatin('привет')).toBeFalsy()
	})
})
