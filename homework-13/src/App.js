import { useState } from 'react'

import './App.css'
import Form from './Form'
import { on, once, inView } from './visitors'

const onFocus = ({ target}) => target.style.borderColor = 'red'

const onBlur = ({ target}) => target.style.borderColor = 'inherit'

const onEnter = () => console.log('onEnter')

const onLeave = () => console.log('onLeave')

const onSubmit = event => console.log('once', event.preventDefault())

const App = () => {
	const [ events, setEvents ] = useState([])

	const pushEvent = eventName => setEvents(prevState => [
		...prevState,
		eventName
	])

	return (
		<div
			className="container"
		>
			<div
				className="container__feed"
			>
				{events.map((eventName, i) => (
					<p
						key={i}
					>
						{i + 1}. {eventName}
					</p>
				))}
			</div>

			<div
				className="container__content"
			>
				<Form
					accept={[
						on('focus', () => pushEvent('focus')),
						on('blur', () => pushEvent('blur')),
						on('input', () => pushEvent('input')),
						inView({
							delay: 1_000,
							enter: () => pushEvent('enter'),
							leave: () => pushEvent('leave')
						}),
						once('submit', onSubmit)
					]}
				/>
			</div>
		</div>
	)
}

export default App
