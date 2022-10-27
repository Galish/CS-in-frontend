export default function format(template = '', params = {}) {
	return template.replace(
		/\${(\w+)}/g,
		(...args) => params[ args[ 1 ] ] || ''
	)
}
