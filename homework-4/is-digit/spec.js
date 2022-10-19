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
		expect(isDigit('ⅫⅦ')).toBeTruthy()
	})

	it('Validating a string containing numerals', () => {
		expect(isDigit('Ⅻ1Ⅶ')).toBeFalsy()
	})

	it('Validating aegean numeral string', () => {
		expect(isDigit('𐄈𐄉𐄌𐄒')).toBeTruthy()
	})

	it('Validating a string containing aegean numerals', () => {
		expect(isDigit('𐄈𐄉a𐄌𐄒')).toBeFalsy()
	})

})
