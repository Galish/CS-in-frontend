// 1.
// Необходимо написать регулярное выражение, которое при вызове test настроке будет давать false,
// если в строке есть символы отличные отлатинских, цифр, подчеркивания и знака $
// myRegExp
// .
// test
// (
// 'привет'
// )
// ;
// // false


export default function isLatin(str = '') {
	return /^[\w$]*$/.test(str)
}
