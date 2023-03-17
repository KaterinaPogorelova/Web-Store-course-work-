// счётчик значка на корзине
export function addCountItems() {
	if (!(localStorage.hasOwnProperty('cart'))) {
		return
	}
	const counter = document.querySelector('.header__basket-elem');
	let cards = JSON.parse(localStorage.getItem('cart'))
	let count = 0
	if (cards.length !== 0) {
		for (const elem of cards) {
			count += elem.count
		}
		counter.style.display = 'inline'
		counter.innerText = count
	} else {
		counter.innerText = '0'
		counter.style.display = 'none'
	}
}
export function increaseCount() {
	const counter = document.querySelector('.header__basket-elem');
	counter.style.display = 'inline';
	let counterNum = Number(counter.innerText)
	counter.innerText = ++counterNum
}

export function reduceCount() {
	const counter = document.querySelector('.header__basket-elem');
	if (counter.innerText === '1') {
		counter.innerText = '0'
		counter.style.display = 'none'
	} else {
		let counterNum = Number(counter.innerText)
		counter.innerText = --counterNum
	}
}