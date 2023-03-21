// Changes the number on the cart counter
export function changeCartCounter() {
	if (!(localStorage.hasOwnProperty('cart'))) {
		return
	}
	const counter = document.querySelector('.header__basket-elem');
	let cards = JSON.parse(localStorage.getItem('cart'))

	if (cards.length !== 0) {
		let count = cards.reduce((acc, elem) => acc + elem.count, 0);
		counter.style.display = 'inline'
		counter.innerText = count
	} else {
		counter.innerText = '0'
		counter.style.display = 'none'
	}
}

// Increases by one the number on the cart counter
export function increaseCartCount() {
	const counter = document.querySelector('.header__basket-elem');
	counter.style.display = 'inline';
	let counterNum = Number(counter.innerText)
	counter.innerText = ++counterNum
}

// Reduces by one the number on the cart counter
export function reduceCartCount() {
	const counter = document.querySelector('.header__basket-elem');
	if (counter.innerText === '1') {
		counter.innerText = '0'
		counter.style.display = 'none'
	} else {
		let counterNum = Number(counter.innerText)
		counter.innerText = --counterNum
	}
}