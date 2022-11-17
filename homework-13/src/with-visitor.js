const withWisitor = WrappedComponent => ({ accept = [], ...restProps }) => {
	const emit = (eventName, ...args) => {
		for (const visitor of accept) {
			visitor.visit(eventName, ...args)
		}
	}

	return (
		<WrappedComponent
			{...restProps}
			emit={emit}
		/>
	)
}

export default withWisitor
