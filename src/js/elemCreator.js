//Функция создаёт элемент
export function createElementTag(block, cssClass = [], attrs = {}) {
	const element = document.createElement(block)
	const classList = cssClass
	element.classList.add(...classList)
	for (const key in attrs) {
		element.setAttribute(key, attrs[key])
	}
	return element
}