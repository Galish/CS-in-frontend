import { useLayoutEffect, useRef } from 'react'

import './Form.css'
import withVisitor from './with-visitor'

const Form = ({ emit }) => {
	const ref = useRef(null)

	useLayoutEffect(() => {
		emit('mount', ref.current)

		return () => emit('unmount', ref.current)
	}, [])

	return (
		<form
			className="form"
			onSubmit={emit.bind(this, 'submit')}
			ref={ref}
		>
			<input
				className="form__input"
				onBlur={emit.bind(this, 'blur')}
				onChange={emit.bind(this, 'input')}
				onFocus={emit.bind(this, 'focus')}
				type="text"
			/>

			<input
				className="form__submit"
				type="submit"
			/>
		</form>
	)
}

export default withVisitor(Form)
