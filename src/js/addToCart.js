import { createElementTag } from './elemCreator.js';
import { changeCartAppear, changeTotalSum } from './basket.js'
import { changeCartCounter, reduceCartCount, increaseCartCount } from './basketCounter.js';

//Creates card's object
function CartItem(title, currentPrice, id, imgSrc, needSizes, size) {
	this.title = title
	this.currentPrice = currentPrice
	this.id = id
	this.count = 1
	this.imgSrc = imgSrc
	this.needSizes = needSizes
	this.size = size
}

//Checks to see if the product card is already in the local storage
export function existInStorage(id, needSizes, size) {
	let cart = JSON.parse(localStorage.getItem('cart'));
	if (needSizes) {
		for (const elem of cart) {
			if (elem.id === id && elem.size === size) {
				return true
			}
		}
		return false
	} else {
		for (const elem of cart) {
			if (elem.id === id) {
				return true
			}
		}
		return false
	}
}


//Adds product card to local storage
export function addCardtoStorage(title, currentPrice, id, source, needSizes, size) {
	let cart = JSON.parse(localStorage.getItem('cart'));
	if (needSizes) {
		let newCard = new CartItem(title, currentPrice, id, source, needSizes, size);
		cart.push(newCard)
	} else {
		let newCard = new CartItem(title, currentPrice, id, source, needSizes);
		cart.push(newCard)
	}

	localStorage.setItem('cart', JSON.stringify(cart));
}

//Draws product card in the cart
export function generateCartItem(title, currentPrice, source, count, id, needSizes, size) {
	const wrapper = document.querySelector('.shopping__bag-card--wrapper')

	const card = createElementTag('div', ['shopping__bag-card'], {})
	wrapper.append(card)

	if (size !== undefined) {
		card.id = `${id}-${size}`
	} else {
		card.id = `${id}-1`
	}
	const infoWrap = createElementTag('div', ['card__info--wrapper'], {})
	card.append(infoWrap)
	const imgWrap = createElementTag('div', ['card__img--wrapper'], {})
	infoWrap.append(imgWrap)
	const cardImg = createElementTag('img', [], { src: source, alt: title })
	imgWrap.append(cardImg)
	const cardText = createElementTag('div', ['card__text'], {})
	infoWrap.append(cardText)
	const cardTitle = createElementTag('p', ['card__title'], {})
	cardTitle.innerText = title
	cardText.append(cardTitle)
	if (needSizes) {
		const selectedSize = createElementTag('p', ['card__sizes'], {})
		selectedSize.innerText = `Size: ${size}`
		cardText.append(selectedSize)
	}
	const priceWrap = createElementTag('div', ['card__price--wrapper'], {})
	card.append(priceWrap)
	const cardPrice = createElementTag('p', ['card__price'], {})

	cardPrice.innerText = currentPrice * count + '$';

	priceWrap.append(cardPrice)
	const cardCount = createElementTag('div', ['card__count'], {})
	priceWrap.append(cardCount)

	const minus = createElementTag('button', ['card__count-minus'], {})
	minus.innerText = '-'
	cardCount.append(minus)
	minus.addEventListener('click', () => {
		if (size !== undefined) {
			reduceItemCount(id, needSizes, size)
		} else {
			reduceItemCount(id, needSizes)
		}

	})
	const countValue = createElementTag('p', ['card__count-sum'], {})
	countValue.innerText = count
	cardCount.append(countValue)
	const plus = createElementTag('button', ['card__count-plus'], {})
	plus.innerText = '+'
	cardCount.append(plus)
	plus.addEventListener('click', () => {
		if (size !== undefined) {
			increaseItemCount(id, needSizes, size)
		} else {
			increaseItemCount(id, needSizes)
		}

	})
	const close = createElementTag('div', ['closeBtn'], {})
	card.append(close)
	close.addEventListener('click', () => {
		card.remove()
		removeCardfromStorage(needSizes, id, size)
		changeTotalSum()
		changeCartCounter()
	})
}

//Removes card from the Local Storage
function removeCardfromStorage(needSizes, id, size) {
	let cart = JSON.parse(localStorage.getItem('cart'));
	if (needSizes) {
		for (let i = 0; i < cart.length; i++) {
			if (cart[i].id === id && cart[i].size === size) {
				cart.splice(i, 1)
			}
		}
	} else {
		for (let i = 0; i < cart.length; i++) {
			if (cart[i].id === id) {
				cart.splice(i, 1)
			}
		}
	}
	localStorage.setItem('cart', JSON.stringify(cart));
	changeCartAppear(cart)
}

//Increases by one quantity of item in the cart
export function increaseItemCount(itemId, needSizes, size) {
	let card
	if (size) {
		card = document.getElementById(`${itemId}-${size}`);
	} else {
		card = document.getElementById(`${itemId}-1`);
	}
	const childs = card.children
	const wrap = childs[childs.length - 2]
	const countWrap = wrap.lastElementChild
	const count = countWrap.children[1]
	const countNum = Number(count.innerText)
	let cart = JSON.parse(localStorage.getItem('cart'));
	if (needSizes) {
		for (const elem of cart) {
			if (elem.id === itemId && elem.size === size) {
				elem.count++
				count.innerText = countNum + 1
				changeCardSum(card, elem.currentPrice, elem.count)
			}
		}
	} else {
		for (const elem of cart) {
			if (elem.id === itemId) {
				elem.count++
				count.innerText = countNum + 1
				changeCardSum(card, elem.currentPrice, elem.count)
			}
		}
	}
	increaseCartCount()
	localStorage.setItem('cart', JSON.stringify(cart));
	changeTotalSum()
}

//Reduces by one quantity of the item in the cart
function reduceItemCount(itemId, needSizes, size) {
	let card
	if (size) {
		card = document.getElementById(`${itemId}-${size}`);
	} else {
		card = document.getElementById(`${itemId}-1`);
	}
	const childs = card.children
	const wrap = childs[childs.length - 2]
	const countWrap = wrap.lastElementChild
	const count = countWrap.children[1]
	const countNum = Number(count.innerText)
	let cart = JSON.parse(localStorage.getItem('cart'));
	if (needSizes) {
		for (const elem of cart) {
			if (elem.id === itemId && elem.size === size) {
				if (countNum === 1) {
					return
				}
				elem.count--
				count.innerText = countNum - 1
				changeCardSum(card, elem.currentPrice, elem.count)
			}
		}
	} else {
		for (const elem of cart) {
			if (elem.id === itemId) {
				if (countNum === 1) {
					return
				}
				elem.count--
				count.innerText = countNum - 1
				changeCardSum(card, elem.currentPrice, elem.count)
			}
		}
	}
	reduceCartCount()
	localStorage.setItem('cart', JSON.stringify(cart));
	changeTotalSum()
}

//Pop-up
export function addtoCartPopUp() {
	const popup = document.createElement('p')
	popup.classList.add('pop-up')
	popup.innerText = 'The product was added to your cart'
	document.body.append(popup)
	setTimeout(() => {
		popup.remove()
	}, 1000)
}

//Changes total sum of the product, depending on his quantity
function changeCardSum(card, price, count) {
	const childs = card.children
	const wrap = childs[childs.length - 2]
	const priceSumEl = wrap.firstElementChild
	let newSum = price * count
	priceSumEl.innerText = `${newSum}$`
}
