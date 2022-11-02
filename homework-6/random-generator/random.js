export default function random(min, max) {
	return {
		[ Symbol.iterator ]() {
			return this
		},
		next() {
			return {
				value: Math.round(Math.random() * (max - min) + min),
				done: false
			}
		}
	}
}
