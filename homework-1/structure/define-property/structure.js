export default class Structure {
	constructor(scheme = []) {
		this.res = {}

		const data = new Array(scheme.length)

		for (const [ index, key ] of scheme.entries()) {
			Object.defineProperty(
				this.res,
				key,
				{
					get() {
						return data[ index ]
					},

					set(value) {
						data[ index ] = value
					}
				}
			)
		}
	}

	set(key, value) {
		this.res[ key ] = value
	}

	get(key) {
		return this.res[ key ]
	}
}
