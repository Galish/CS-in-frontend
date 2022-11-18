import { useCallback } from 'react'

const withWisitor = WrappedComponent => ({ accept = [], ...restProps }) => {
	const emit = useCallback(
		(eventName, ...args) => {
			for (const visitor of accept) {
				visitor.visit(eventName, ...args)
			}
		},
		[ accept ]
	)

	return (
		<WrappedComponent
			{...restProps}
			emit={emit}
		/>
	)
}

export default withWisitor
