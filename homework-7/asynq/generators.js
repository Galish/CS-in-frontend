function* foo() {
	// const a = yield Promise.resolve(123)
	const a = yield 1
	const b = yield 2
	const c = yield 3
	console.log('!!!', a, b, c, '=', a + b + c)

	return a + b + c
}

const gen = foo()

console.log('-gen-', gen)
console.log('-1-', gen.next())
console.log('-2-', gen.next(10))
console.log('-3-', gen.next(20))
console.log('-4-', gen.next(30))

function async
