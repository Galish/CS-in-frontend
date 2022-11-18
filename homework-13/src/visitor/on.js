export default function on(eventName, cb) {
	return {
		visit: (...args) => {
			if (eventName === args[ 0 ]) {
				cb(...args.slice(1))
			}
		}
	}
}
