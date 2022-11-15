export async function* once($element, eventName) {
	yield await oncePromise($element, eventName)
}

export async function* on($element, eventName) {
	while (true) {
		yield await oncePromise($element, eventName)
	}
}

export async function* take(asyncIterator, count = 1) {
	let index = 0

	for await (const res of asyncIterator) {
		if (index >= count) {
			return
		}

		index++

		yield res
	}
}

export async function* seq(...asyncIterators) {
	for (const asyncIterator of asyncIterators) {
		for await (const res of asyncIterator) {
			yield res
		}
	}
}

export async function* filter(asyncIterator, predicate) {
	for await(const res of asyncIterator) {
		if (!predicate?.(res)) {
			continue
		}

		yield res
	}
}

export async function* map(asyncIterator, ...modifiers) {
	for await(const res of asyncIterator) {
		let value = res

		for (const fn of modifiers) {
			value = fn(value)
		}

		yield value
	}
}

function oncePromise($element, eventName) {
	return new Promise(resolve => {
		$element.addEventListener(eventName, handler)

		function handler(...args) {
			resolve(...args)
			$element.removeEventListener(eventName, handler)
		}
	})
}
