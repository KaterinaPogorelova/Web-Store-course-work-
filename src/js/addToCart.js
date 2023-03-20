import { changeCart } from './basket.js'
import { addCountItems, reduceCount, increaseCount } from './basketCounter.js';

function CartItem(title, currentPrice, id, imgSrc, needSizes, size) {
	this.title = title
	this.currentPrice = currentPrice
	this.id = id
	this.count = 1
	this.imgSrc = imgSrc
	this.needSizes = needSizes
	this.size = size
}

//Проверяет есть ли уже такой товар в localStorage
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


//Создаёт карточку товара в localStorage
export function addToCart(title, currentPrice, id, source, needSizes, size) {
	let cart = JSON.parse(localStorage.getItem('cart'));
	if (needSizes) {
		if (size === undefined) {
			size = 'XS'
		}
		let newCard = new CartItem(title, currentPrice, id, source, needSizes, size);
		cart.push(newCard)
	} else {
		let newCard = new CartItem(title, currentPrice, id, source, needSizes);
		cart.push(newCard)
	}
	localStorage.setItem('cart', JSON.stringify(cart));
}

//Отрисовка карточки товара в корзине
export function generateCartItem(title, currentPrice, source, count, id, needSizes, size) {
	const wrapper = document.querySelector('.shopping__bag-card--wrapper')
	const card = document.createElement('div')
	card.classList.add('shopping__bag-card')
	if (size) {
		card.id = `${id}-${size}`
	} else {
		card.id = `${id}-1`
	}
	wrapper.append(card)
	const infoWrap = document.createElement('div')
	infoWrap.classList.add('card__info--wrapper')
	card.append(infoWrap)
	const imgWrap = document.createElement('div')
	imgWrap.classList.add('card__img--wrapper')
	infoWrap.append(imgWrap)
	const cardImg = document.createElement('img')
	//Поменять путь картинки через переменную!
	cardImg.src = source
	//В качестве атрибута alt пусть будет переменная title
	cardImg.alt = title
	imgWrap.append(cardImg)
	const cardText = document.createElement('div')
	cardText.classList.add('card__text')
	infoWrap.append(cardText)
	const cardTitle = document.createElement('p')
	cardTitle.classList.add('card__title')
	//Вставить название товара title
	cardTitle.innerText = title
	cardText.append(cardTitle)
	if (needSizes) {
		const sizes = document.createElement('p')
		sizes.classList.add('card__sizes')
		//Вставить сюда значение размера size
		sizes.innerText = `Size: ${size}`
		cardText.append(sizes)
	}
	const priceWrap = document.createElement('div')
	priceWrap.classList.add('card__price--wrapper')
	card.append(priceWrap)
	const cardPrice = document.createElement('p')
	cardPrice.classList.add('card__price')
	//Генерация цены из currentPrice
	//Общая сумма одного товара (работает только при перезагрузке страницы)
	let sumPrice = (Number(currentPrice)) * (Number(count)) + '$';
	cardPrice.innerText = sumPrice;
	priceWrap.append(cardPrice)
	const cardCount = document.createElement('div')
	cardCount.classList.add('card__count')
	priceWrap.append(cardCount)
	const minus = document.createElement('button')
	minus.classList.add('card__count-minus')
	minus.innerText = '-'
	cardCount.append(minus)
	minus.addEventListener('click', () => {
		let needReduce = true
		if (size) {
			changeCountNum(id, needSizes, size, needReduce)
		} else {
			changeCountNum(id, needSizes, false, needReduce)
		}

	})
	const countValue = document.createElement('p')
	countValue.classList.add('card__count-sum')
	//Количество товара в корзине, генерируется из локалСтораджа
	countValue.innerText = count
	cardCount.append(countValue)
	const plus = document.createElement('button')
	plus.classList.add('card__count-plus')
	plus.innerText = '+'
	cardCount.append(plus)
	plus.addEventListener('click', () => {
		if (size) {
			changeCountNum(id, needSizes, size)
		} else {
			changeCountNum(id, needSizes)
		}

	})
	const close = document.createElement('div')
	close.classList.add('closeBtn')
	card.append(close)
	close.addEventListener('click', () => {
		card.remove()
		let cart = JSON.parse(localStorage.getItem('cart'));
		if (needSizes) {
			for (let i = 0; i < cart.length; i++) {
				if (cart[i].id === id && cart[i].size === size) {
					cart.splice(i, 1)
					localStorage.setItem('cart', JSON.stringify(cart));
					changeCart(cart)
				}
			}
		} else {
			for (let i = 0; i < cart.length; i++) {
				if (cart[i].id === id) {
					cart.splice(i, 1)
					localStorage.setItem('cart', JSON.stringify(cart));
					changeCart(cart)
				}
			}
		}
		addCountItems()
	})
}

//Функция, меняющая значение количества товара в localStorage и в корзине
export function changeCountNum(itemId, needSizes, size, needReduce) {
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
				if (needReduce && countNum > 1) {
					elem.count--
					count.innerText = countNum - 1
					reduceCount()
					localStorage.setItem('cart', JSON.stringify(cart));
				} else if (needReduce && countNum === 1) {
					return
				} else {
					elem.count++
					count.innerText = countNum + 1
					increaseCount()
					localStorage.setItem('cart', JSON.stringify(cart));
				}

			}
		}
	} else {
		for (const elem of cart) {
			if (elem.id === itemId) {
				if (needReduce && countNum > 1) {
					elem.count--
					count.innerText = countNum - 1
					reduceCount()
					localStorage.setItem('cart', JSON.stringify(cart));
				} else if (needReduce && countNum === 1) {
					return
				} else {
					elem.count++
					count.innerText = countNum + 1
					increaseCount()
					localStorage.setItem('cart', JSON.stringify(cart));
				}
			}
		}
	}
}

export function addtoCartPopUp() {
	const popup = document.createElement('p')
	popup.classList.add('pop-up')
	popup.innerText = 'Товар добавлен в корзину'
	document.body.append(popup)
	setTimeout(() => {
		popup.remove()
	}, 1000)
}