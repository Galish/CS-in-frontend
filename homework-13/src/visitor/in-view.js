export default function inView(options = {}) {
	let currentTarget = null
	let lastEventName = null
	const promise = {}

	const handler = entries => {
		for (const entry of entries) {
			const eventName = entry.intersectionRatio > 0 ? 'enter' : 'leave'

			if (
				entry.target === currentTarget
				&&
				eventName !== lastEventName
			) {
				options?.[ eventName ]?.(currentTarget)
				promise.resolve([ eventName, currentTarget ])
				lastEventName = eventName
			}
		}
	}

	const streamGenerator = function* () {
		while (true) {
			yield new Promise(resolve => promise.resolve = resolve)
		}
	}

	options.stream?.(streamGenerator())

	const observer = new IntersectionObserver(handler)

	return {
		visit: (eventName, target) => {
			if (
				eventName !== 'render'
				||
				target == null
				||
				target === currentTarget
			) {
				return
			}

			if (currentTarget != null) {
				observer.unobserve(currentTarget)
			}

			observer.observe(target)
			currentTarget = target
		}
	}
}
