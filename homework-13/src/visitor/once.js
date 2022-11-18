export default function once(eventName, cb) {
	let isVisited = false

	return {
		visit: (...args) => {
			if (eventName === args[ 0 ] && !isVisited) {
				cb(...args.slice(1))
				isVisited = true
			}
		}
	}
}
