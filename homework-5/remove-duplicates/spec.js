import removeDuplicatedSubstrings from './remove-duplicates'

describe('Remove duplicated substrings', () => {
	it('#1', () => {
		const input = 'aaaabbbbczzzz'
		const str = removeDuplicatedSubstrings(input)

		expect(str).toBe('abcz')
	})

	it('#2', () => {
		const input = 'abababbbabcabc'
		const str = removeDuplicatedSubstrings(input)

		expect(str).toBe('abbabc')
	})

	it('#3', () => {
		const input = 'foofoobabaaaazze'
		const str = removeDuplicatedSubstrings(input)

		expect(str).toBe('foobaaze')
	})
})
