export default function timeout(promise, ms = 0) {
	if (!(promise instanceof Promise)) {
		throw new Error('Pass the promise');
	}

	return new Promise((resolve, reject) => {
		setTimeout(() => reject('Timeout exceeded'), ms);

		promise
			.then(resolve)
			.catch(reject);
	});
}
