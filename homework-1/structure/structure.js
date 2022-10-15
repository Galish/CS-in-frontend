export default class Structure {
	constructor(keys = []) {
		this.arraySize = keys.length
		this.array = new Array(this.arraySize)

		this.keyToIndex = {}

		for (const index in keys) {
			this.keyToIndex[ keys[ index ] ] = index
		}
	}

	set(key, value) {
		this.array[ this.keyToIndex[ key ] ] = value
	}

	get(key) {
		return this.array[ this.keyToIndex[ key ] ]
	}
}
