import splitString from './split-string'

describe('Split string by delimitters', () => {
	it('Handles empty string', () => {
		expect(splitString()).toEqual([ '' ])
	})

	it('Handles single word string', () => {
		expect(splitString('foo')).toEqual([ 'foo' ])
	})

	it('Handles string containing delimitters', () => {
		expect(
			splitString('foo bla.bar,gd;4')
		).toEqual(
			[ 'foo', 'bla', 'bar', 'gd', '4' ]
		)
	})

	it('Handles string containing repeating delimitters', () => {
		expect(
			splitString('foo  +  bla....bar,,,gd;;;4')
		).toEqual(
			[ 'foo', '+', 'bla', 'bar', 'gd', '4' ]
		)
	})

})
