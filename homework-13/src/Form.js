import PropTypes from 'prop-types'

import './Form.css'
import { callAll, preventDefault } from './helpers'
import { withVisitor } from './visitor'

const Form = ({ emit }) => (
	<form
		className="form"
		onSubmit={callAll(
			preventDefault,
			emit.bind(null, 'submit')
		)}
		ref={emit.bind(null, 'render')}
	>
		<input
			className="form__input"
			name="text"
			onBlur={emit.bind(null, 'blur')}
			onChange={emit.bind(null, 'input')}
			onFocus={emit.bind(null, 'focus')}
			type="text"
		/>

		<input
			className="form__submit"
			type="submit"
		/>
	</form>
)

Form.propTypes = {
	emit: PropTypes.func
}

export default withVisitor(Form)
