const items = document.querySelectorAll('.item__img-wrapper')
const allBtnReview = document.querySelectorAll('.img-wrapper__button_review')

export function hideAndShowReviewBtn(item) {
	//Исправить потом: убрать цикл, добавить функцию в функцию генерации карточки товара
	for (const elem of items) {
		elem.addEventListener('mouseover', () => {
			let btnReview = elem.children[1]
			btnReview.style.display = 'block'
		})
		elem.addEventListener('mouseout', () => {
			let btnReview = elem.children[1]
			btnReview.style.display = 'none'
		})
	}
}
hideAndShowReviewBtn()

//Генерируем окно рассмотрения товара вблизи, тоже добавить в генерацию карточек

for (const elem of allBtnReview) {
	elem.addEventListener('click', generateItemFastReview)
}

//Функция для генерации окна просмотра товара вблизи
export function generateItemFastReview(item) {
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
	img.src = '/laura-chouette.38ab3c43.jpg'
	img.alt = 'Jacket'
	imgWrap.append(img)
	const fullInfoWrap = document.createElement('div')
	fullInfoWrap.classList.add('item-full__info-wrapper')
	fullItem.append(fullInfoWrap)
	const fullInfo = document.createElement('div')
	fullInfo.classList.add('item-full__info')
	fullInfoWrap.append(fullInfo)

	const title = document.createElement('h2')
	title.classList.add('item-full__title')
	//Вставить название товара
	title.innerText = 'Jacket'
	fullInfo.append(title)
	const itemPrices = document.createElement('div')
	itemPrices.classList.add('item__prices')
	fullInfo.append(itemPrices)
	const fullCurrentPrice = document.createElement('p')
	fullCurrentPrice.classList.add(...['item__price', 'item__item__current-price', 'item__price--full'])
	itemPrices.append(fullCurrentPrice)
	const salePrice = document.createElement('span')
	salePrice.classList.add('sale-price')
	//Вставить цену после скидки
	salePrice.innerText = 500
	fullCurrentPrice.innerText = '$'
	fullCurrentPrice.prepend(salePrice)

	const fullBeforePrice = document.createElement('p')
	fullBeforePrice.classList.add(...['item__price', 'item__price-before-sale', 'item__price--full'])
	itemPrices.append(fullBeforePrice)
	const price = document.createElement('span')
	price.classList.add('price')
	//Вставить цену до скидки
	price.innerText = 750
	fullBeforePrice.innerText = '$'
	fullBeforePrice.prepend(price)
	//Вставить размеры, если нужно 
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
	//Конец списка размеров

	const buttonFullCart = document.createElement('button')
	buttonFullCart.classList.add('item-full__button-cart')
	buttonFullCart.innerText = 'Add to Cart'
	fullInfoWrap.append(buttonFullCart)
	//Анимировать кнопку close
	close.addEventListener('click', () => {
		fullItem.remove()
		darkBack.remove()
	})
}