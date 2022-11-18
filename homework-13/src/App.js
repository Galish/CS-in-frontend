import { useMemo, useState } from 'react'

import Form from './Form'
import { addOutline, changeBgColor, removeOutline } from './helpers'
import { on, inView } from './visitor'

const App = () => {
	const [ data = [], setData ] = useState([])

	const appendData = value => setData(prevState => [ ...prevState, value ])

	const handleSubmit = ({ target }) => {
		const formData = new FormData(target)

		appendData(formData.get('text'))
		target.reset()
	}

	const accept = useMemo(
		() => [
			on('focus', addOutline),
			on('blur', removeOutline),
			on('submit', handleSubmit),
			inView({
				// delay: 1_000,
				enter: changeBgColor(),
				leave: changeBgColor('#ebebeb'),
				stream: async(asyncIterable) => {
					for await (const [ eventName ] of asyncIterable) {
						console.log('inView stream event:', eventName);
					}
				}
			})
		],
		[]
	)

	return (
		<>
			<Form
				accept={accept}
			/>

			<ul>
				{data.map((value, index) => (
					<li
						key={index}
					>
						{value}
					</li>
				))}
			</ul>
		</>
	)
}

export default App
