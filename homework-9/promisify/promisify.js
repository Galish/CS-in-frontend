export default function promisify(fn) {
	if (typeof fn !== 'function') {
		throw new Error('Pass the function')
	}

	return (...args) => new Promise((resolve, reject) => {
		fn(...args, (err, data) => {
			if (err != null) {
				reject(err)
			}

			resolve(data)
		})
	})
}
