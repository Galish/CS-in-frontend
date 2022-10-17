export default class Structure {
	constructor(scheme = []) {
		this.data = new Array(scheme.length)

		const getIndexBody = `
			switch (key) {
				${scheme.reduce((res, key, index) => res + `case '${key}': return ${index};`, '')}
			}
		`

		this.getIndex = Function('key', getIndexBody)
	}

	set(key, value) {
		this.data[ this.getIndex(key) ] = value
	}

	get(key) {
		return this.data[ this.getIndex(key) ]
	}
}
