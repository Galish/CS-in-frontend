import Structure from './structure.js'

describe('Fixed size array based Stack', () => {

	it('should create Structure instance', () => {
		const jackBlack = new Structure(['name', 'lastName', 'age'])

		expect(jackBlack).toBeInstanceOf(Structure)
	})

	it('should set and get Structure values', () => {
		const jackBlack = new Structure(['name', 'lastName', 'age'])

		jackBlack.set('name', 'Jack')
		jackBlack.set('lastName', 'Black')
		jackBlack.set('age', 53)

		expect(jackBlack.get('name')).toEqual('Jack')
		expect(jackBlack.get('lastName')).toEqual('Black')
		expect(jackBlack.get('age')).toEqual(53)
	})

})
