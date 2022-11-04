export default class Range {
	constructor(rangeFrom, rangeTo) {
		this.rangeFrom = rangeFrom
		this.rangeTo = rangeTo
		this.type = typeof rangeFrom

		if (this.type === 'number') {
			this.current = rangeFrom
			this.end = rangeTo
		}

		if (this.type === 'string') {
			this.current = rangeFrom.charCodeAt(0)
			this.end = rangeTo.charCodeAt(0)
		}
	}

	getValue = code => {
		switch (this.type) {
		case 'string':
			return String.fromCodePoint(code)

		default:
			return code
		}
	}

	[ Symbol.iterator ]() {
		return this
	}

	next() {
		if (this.current <= this.end) {
			const code = this.current

			this.current++

			return {
				done: false,
				value: this.getValue(code)
			}
		}

		return {
			done: true
		}
	}

	reverse() {
		return new Range(this.rangeTo, this.rangeFrom)
	}
}
