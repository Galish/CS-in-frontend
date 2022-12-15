import PropTypes from 'prop-types'

import './Form.css'
import { callAll, preventDefault } from './helpers'
import { withVisitor } from './visitor'

const Form = ({ ctx }) => (
	<form
		className="form"
		onSubmit={callAll(
			preventDefault,
			ctx.emit.bind(null, 'submit')
		)}
		ref={ctx.ref}
	>
		<input
			className="form__input"
			name="text"
			onBlur={ctx.emit.bind(null, 'blur')}
			onChange={ctx.emit.bind(null, 'input')}
			onFocus={ctx.emit.bind(null, 'focus')}
			type="text"
		/>

		<input
			className="form__submit"
			type="submit"
		/>
	</form>
)

Form.propTypes = {
	ctx: PropTypes.shape({
		emit: PropTypes.func,
		ref: PropTypes.object
	})
}

export default withVisitor(Form)
