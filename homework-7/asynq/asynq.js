export default function asynq(generateFactory) {
	if (!isGeneratorFunction(generateFactory)) {
		throw new Error('Provided function must be a generator function')
	}

	const generator = generateFactory()

	return (
		function resolve(state) {
			if (state.done) {
				return state.value
			}

			return Promise.resolve(state.value)
				.then(data => resolve(generator.next(data)))
				.catch(err => resolve(generator.throw(err)))
		}
	)(generator.next())
}

function isGeneratorFunction(fn) {
	return Object.prototype.toString.call(fn) === '[object GeneratorFunction]'
}
