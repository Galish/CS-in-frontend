import isDigit from './is-digit'

describe('Is the input string a digit', () => {

	it('Validating empty string', () => {
		expect(isDigit()).toBeTruthy()
	})

	it('Validating arabic numeral string', () => {
		expect(isDigit('0123456789')).toBeTruthy()
	})

	it('Validating a string containing arabic numerals', () => {
		expect(isDigit('012a456789')).toBeFalsy()
	})

	it('Validating roman numeral string', () => {
		expect(isDigit('â«â¦')).toBeTruthy()
	})

	it('Validating a string containing numerals', () => {
		expect(isDigit('â«1â¦')).toBeFalsy()
	})

	it('Validating aegean numeral string', () => {
		expect(isDigit('ğğğğ')).toBeTruthy()
	})

	it('Validating a string containing aegean numerals', () => {
		expect(isDigit('ğğağğ')).toBeFalsy()
	})

})
