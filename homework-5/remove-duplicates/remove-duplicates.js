export default function removeDuplicatedSubstrings(str = '') {
	return str.replace(/(.+?)\1+/g, '$1')
}
