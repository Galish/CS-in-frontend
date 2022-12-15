export async function* once($element, eventName) {
	yield await oncePromise($element, eventName)
}

export async function* on($element, eventName) {
	while (true) {
		yield await oncePromise($element, eventName)
	}
}

export function onlyEvent(eventName) {
	return function(obj) {
		return (
			obj instanceof Event
			&&
			obj.type === eventName
		)
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

export async function* parallel(...asyncIterators) {
	const promise = {};

	for (const asyncIterator of asyncIterators) {
		(async function(){
			for await (const res of asyncIterator) {
				promise.resolve(res)
			}
		})()
	}

	while(true) {
		yield await new Promise(resolve => promise.resolve = resolve)
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

export async function* every(asyncIterator, predicate) {
	for await(const res of asyncIterator) {
		if (!predicate?.(res)) {
			return
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

export async function* repeat(asyncIteratorFn) {
	while (true) {
		for await (const res of asyncIteratorFn()) {
			yield res
		}
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
