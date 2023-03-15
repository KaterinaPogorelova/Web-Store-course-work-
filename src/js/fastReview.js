import { existInStorage, addToCart, changeCountNum, addtoCartPopUp } from './addToCart.js'
import { getCard } from './basket.js'

//Функция для генерации окна просмотра товара вблизи
let selectedSize = ''
export function generateItemFastReview(title, currentPrice, id, beforePrice, source, needSizes) {
	//Добавить затемнение экрана на body
	const darkBack = document.createElement('div')
	darkBack.classList.add('dark-back')
	document.body.append(darkBack)
	//Создаём элемент
	const fullItem = document.createElement('div')
	fullItem.classList.add('trend__item-full')
	document.body.append(fullItem)
	const close = document.createElement('div')
	close.classList.add('close')
	fullItem.append(close)

	const imgWrap = document.createElement('div')
	imgWrap.classList.add('item-full__img-wrapper')
	fullItem.append(imgWrap)

	const img = document.createElement('img')
	//Вставить картинку из mockapi
	img.src = source
	img.alt = title
	imgWrap.append(img)
	const fullInfoWrap = document.createElement('div')
	fullInfoWrap.classList.add('item-full__info-wrapper')
	fullItem.append(fullInfoWrap)
	const fullInfo = document.createElement('div')
	fullInfo.classList.add('item-full__info')
	fullInfoWrap.append(fullInfo)

	const itemTitle = document.createElement('h2')
	itemTitle.classList.add('item-full__title')
	//Вставить название товара
	itemTitle.innerText = title
	fullInfo.append(itemTitle)
	const itemPrices = document.createElement('div')
	itemPrices.classList.add('item__prices')
	fullInfo.append(itemPrices)
	const fullCurrentPrice = document.createElement('p')
	fullCurrentPrice.classList.add(...['item__price', 'item__item__current-price', 'item__price--full'])
	itemPrices.append(fullCurrentPrice)
	const salePrice = document.createElement('span')
	salePrice.classList.add('sale-price')
	//Вставить цену после скидки
	salePrice.innerText = currentPrice
	fullCurrentPrice.innerText = '$'
	fullCurrentPrice.prepend(salePrice)

	const fullBeforePrice = document.createElement('p')
	fullBeforePrice.classList.add(...['item__price', 'item__price-before-sale', 'item__price--full'])
	itemPrices.append(fullBeforePrice)
	const price = document.createElement('span')
	price.classList.add('price')
	//Вставить цену до скидки
	price.innerText = beforePrice
	fullBeforePrice.innerText = '$'
	fullBeforePrice.prepend(price)
	//Вставить размеры, если нужно
	if (needSizes) {
		const ulSizes = document.createElement('ul')
		ulSizes.classList.add('item-full__sizes')
		fullInfoWrap.append(ulSizes)
		const XS = document.createElement('li')
		XS.classList.add('item-full__size')
		ulSizes.append(XS)
		const labelXS = document.createElement('label')
		labelXS.classList.add('size__value')
		labelXS.innerText = 'XS'
		XS.append(labelXS)
		const S = document.createElement('li')
		S.classList.add('item-full__size')
		ulSizes.append(S)
		const labelS = document.createElement('label')
		labelS.classList.add('size__value')
		labelS.innerText = 'S'
		S.append(labelS)
		const M = document.createElement('li')
		M.classList.add('item-full__size')
		ulSizes.append(M)
		const labelM = document.createElement('label')
		labelM.classList.add('size__value')
		labelM.innerText = 'M'
		M.append(labelM)
		const L = document.createElement('li')
		L.classList.add('item-full__size')
		ulSizes.append(L)
		const labelL = document.createElement('label')
		labelL.classList.add('size__value')
		labelL.innerText = 'L'
		L.append(labelL)
		const XL = document.createElement('li')
		XL.classList.add('item-full__size')
		ulSizes.append(XL)
		const labelXL = document.createElement('label')
		labelXL.classList.add('size__value')
		labelXL.innerText = 'XL'
		XL.append(labelXL)


		//Анимация выбора размера
		const allSizes = ulSizes.children

		for (const elem of allSizes) {
			elem.addEventListener('click', () => {
				elem.classList.toggle('item-full__size--selected')
				//Помещает в переменную, выбранный пользователем размер 
				selectedSize = elem.firstElementChild.innerText
				//потом добавить в объект свойство размер для отображения в корзине 
				for (let i = 0; i < allSizes.length; i++) {
					if (allSizes[i] !== elem) {
						if (allSizes[i].classList.contains('item-full__size--selected')) {
							allSizes[i].classList.remove('item-full__size--selected')
						}
					}
				}
			})
		}
	} //Конец списка размеров

	const buttonFullCart = document.createElement('button')
	buttonFullCart.classList.add('item-full__button-cart')
	buttonFullCart.innerText = 'Add to Cart'
	fullInfoWrap.append(buttonFullCart)
	buttonFullCart.addEventListener('click', () => {
		if (needSizes && selectedSize === '') {
			chooseSizePopUp()
		} else {
			let exist = existInStorage(id, needSizes, selectedSize)
			if (!exist) {
				if (needSizes) {
					addToCart(title, currentPrice, id, source, needSizes, selectedSize)
					getCard(id, needSizes, selectedSize)
					selectedSize = ''
					addtoCartPopUp()
				} else {
					addToCart(title, currentPrice, id, source, needSizes)
					getCard(id, needSizes)
					addtoCartPopUp()
				}
			} else {
				if (needSizes) {
					changeCountNum(id, needSizes, selectedSize)
					selectedSize = ''
				} else {
					changeCountNum(id, needSizes)
				}
				addtoCartPopUp()
			}
		}
	})
	//Анимировать кнопку close
	close.addEventListener('click', () => {
		fullItem.remove()
		darkBack.remove()
	})
}

function chooseSizePopUp() {
	const popup = document.createElement('p')
	popup.classList.add('pop-up')
	popup.innerText = 'Пожалуйста, выберите размер!'
	document.body.append(popup)
	setTimeout(() => {
		popup.remove()
	}, 2000)
}