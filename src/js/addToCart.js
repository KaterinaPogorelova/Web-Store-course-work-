import { changeCart } from './basket.js'
function CartItem(title, currentPrice, id, imgSrc) {
	this.title = title
	this.currentPrice = currentPrice
	this.id = id
	this.count = 1
	this.imgSrc = imgSrc
}

//Проверяет есть ли уже такой товар в localStorage
export function existInStorage(id) {
	let cart = JSON.parse(localStorage.getItem('cart'));
	for (const elem of cart) {
		if (elem.id === id) {
			return true
		}
	}
	return false
}

//Создаёт карточку товара в localStorage
export function addToCart(title, currentPrice, id, source) {
	let cart = JSON.parse(localStorage.getItem('cart'));
	let newCard = new CartItem(title, currentPrice, id, source);
	cart.push(newCard)
	localStorage.setItem('cart', JSON.stringify(cart));
}

//Отрисовка карточки товара в корзине
export function generateCartItem(title, currentPrice, source, count, id) {
	const wrapper = document.querySelector('.shopping__bag-card--wrapper')
	const card = document.createElement('div')
	card.classList.add('shopping__bag-card')
	card.id = `${id}-1`
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
	const sizes = document.createElement('p')
	sizes.classList.add('card__sizes')
	//Вставить сюда значение размера size
	sizes.innerText = `Size: XS`
	cardText.append(sizes)
	const priceWrap = document.createElement('div')
	priceWrap.classList.add('card__price--wrapper')
	card.append(priceWrap)
	const cardPrice = document.createElement('p')
	cardPrice.classList.add('card__price')
	//Генерация цены из currentPrice
		// cardPrice.innerText = `${currentPrice} $`
	//Общая сумма одного товара (надо привязать эту переменную в событие клик + и -)
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
	const countValue = document.createElement('p')
	countValue.classList.add('card__count-sum')
	//Количество товара в корзине, генерируется из локалСтораджа
	countValue.innerText = count
	cardCount.append(countValue)
	const plus = document.createElement('button')
	plus.classList.add('card__count-plus')
	plus.innerText = '+'
	cardCount.append(plus)
	const close = document.createElement('div')
	close.classList.add('closeBtn')
	card.append(close)
	close.addEventListener('click', () => {
		card.remove()
		let cart = JSON.parse(localStorage.getItem('cart'));
		for (let i = 0; i < cart.length; i++) {
			if (cart[i].id === id) {
				cart.splice(i, 1)
			}
		}
		localStorage.setItem('cart', JSON.stringify(cart));
		changeCart(cart)
	})
}

//Функция, меняющая значение количества товара в localStorage и в корзине
//Дополнить функцию для анимации плюс и минус
export function changeCountNum(itemId) {
	let cart = JSON.parse(localStorage.getItem('cart'));
	for (const elem of cart) {
		if (elem.id === itemId) {
			elem.count++
		}
	}
	localStorage.setItem('cart', JSON.stringify(cart));
	const card = document.getElementById(`${itemId}-1`);
	const childs = card.children
	const wrap = childs[childs.length - 2]
	const countWrap = wrap.lastElementChild
	const count = countWrap.children[1]
	const countNum = Number(count.innerText)
	count.innerText = countNum + 1
}
