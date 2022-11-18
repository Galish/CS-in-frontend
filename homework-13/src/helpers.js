export const callAll = (...fns) => (...args) => (
	fns.forEach(fn => fn && fn(...args))
)

export const preventDefault = event => event?.preventDefault?.()

export const addOutline = ({ target}) => target.style.borderColor = 'red'

export const removeOutline = ({ target}) => target.style.borderColor = 'inherit'

export const changeBgColor = (color = 'transparent') => target => (
	target.parentElement.closest('div').style.backgroundColor = color
)
