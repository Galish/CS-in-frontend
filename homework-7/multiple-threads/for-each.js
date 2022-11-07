import Scheduler from './scheduler.js'

let total = 0

const scheduler = new Scheduler({
	debug: true,
	intervalMs: 0,
	timeoutMs: 10
})

Promise.allSettled([
	scheduler.forEach(
		[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
		() => total++
	),

	scheduler.forEach(
		[ 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ],
		() => total++
	),

	scheduler.forEach(
		[ 20, 21, 22, 23, 24, 25, 26, 27, 28, 29 ],
		() => total++
	),

	scheduler.forEach(
		[ 30, 31, 32, 33, 34, 35, 36, 37, 38, 39 ],
		() => total++
	),

	scheduler.forEach(
		[ 40, 41, 42, 43, 44, 45, 46, 47, 48, 29 ],
		() => total++
	)
])
	.then(() => console.log('Total:', total))
