export default class EventEmitter {
    #listeners = new Map()
    #parent

    constructor(parent) {
        this.#parent = parent
    }

    emit(eventName, ...data) {
        if (eventName == null) {
            throw new Error('Specify an event name')
        }

        this.#parent?.emit?.(
            eventName,
            {
                data: singleValueOrIter(data),
                target: this
            }
        )

        const handlers = this.#listeners.get(eventName)

        if (!(handlers instanceof Set)) {
            return
        }

        for (const fn of handlers) {
            fn(...data)
        }
    }

    on(eventName, fn) {
        if (eventName == null) {
            throw new Error('Specify an event name')
        }

        if (!this.#listeners.has(eventName)) {
            this.#listeners.set(eventName, new Set())
        }

        if (typeof fn === 'function') {
            this.#listeners.get(eventName).add(fn)

            return () => this.off(eventName, fn)
        }

        const promise = {}
        const queue = []
        let isWaitingToDestroy = false

        const streamFn = (...args) => {
            if (!isWaitingToDestroy) {
                queue.push(args)
            }

            promise.resolve()
        }

        const off = this.on(eventName, streamFn)

        async function* generatorFn() {
            while (true) {
                while (true) {
                    if (queue.length === 0) {
                        break
                    }

                    yield singleValueOrIter(queue.shift())
                }

                if (isWaitingToDestroy === true) {
                    return
                }

                await new Promise(resolve => promise.resolve = resolve)
            }
        }

        const generator = generatorFn()

        const destroy = () => {
            off()

            if (queue.length === 0) {
                generator.return()
            } else {
                isWaitingToDestroy = true
            }
        }

        Object.defineProperty(
            generator,
            'off',
            {
                value: destroy
            }
        )

        return generator
    }

    once(eventName, fn) {
        if (eventName == null) {
            throw new Error('Specify an event name')
        }

        if (!this.#listeners.has(eventName)) {
            this.#listeners.set(eventName, new Set())
        }

        const onceFn = (...args) => {
            fn(...args)
            this.off(eventName, onceFn)
        }

        this.#listeners.get(eventName).add(onceFn)
    }

    off(eventName, fn) {
        if (eventName == null) {
            throw new Error('Specify an event name')
        }

        const handlers = this.#listeners.get(eventName)

        if (handlers == null) {
            return
        }

        if (fn == null) {
            handlers.clear()
        } else {
            handlers.delete(fn)
        }
    }
}

function singleValueOrIter(args = []) {
    if (args.length < 2) {
        return args?.[ 0 ]
    }

    return args.values()
}
