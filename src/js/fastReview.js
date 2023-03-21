import { createElementTag } from './elemCreator.js'
import { increaseCartCount } from './basketCounter.js'
import { existInStorage, addCardtoStorage, increaseItemCount, addtoCartPopUp } from './addToCart.js'
import { draWNewCard, changeTotalSum } from './basket.js'


let selectedSize = ''

//Generates product's fast review window 
export function generateItemFastReview(title, currentPrice, id, beforePrice, source, needSizes) {
	const darkBack = createElementTag('div', ['dark-back'], {})
	document.body.append(darkBack)
	const fullItem = createElementTag('div', ['trend__item-full'], {})
	document.body.append(fullItem)
	const close = createElementTag('div', ['close'], {})
	fullItem.append(close)
	const imgWrap = createElementTag('div', ['item-full__img-wrapper'], {})
	fullItem.append(imgWrap)
	const img = createElementTag('img', [], { src: source, alt: title })
	imgWrap.append(img)
	const fullInfoWrap = createElementTag('div', ['item-full__info-wrapper'], {})
	fullItem.append(fullInfoWrap)
	const fullInfo = createElementTag('div', ['item-full__info'], {})
	fullInfoWrap.append(fullInfo)
	const itemTitle = createElementTag('h2', ['item-full__title'], {})
	itemTitle.innerText = title
	fullInfo.append(itemTitle)
	const itemPrices = createElementTag('div', ['item__prices'], {})
	fullInfo.append(itemPrices)
	const fullCurrentPrice = createElementTag('p', ['item__price', 'item__item__current-price', 'item__price--full'], {})
	itemPrices.append(fullCurrentPrice)
	const salePrice = createElementTag('span', ['sale-price'], {})
	salePrice.innerText = currentPrice
	fullCurrentPrice.innerText = '$'
	fullCurrentPrice.prepend(salePrice)
	const fullBeforePrice = createElementTag('p', ['item__price', 'item__price-before-sale', 'item__price--full'], {})
	itemPrices.append(fullBeforePrice)
	const price = createElementTag('span', ['price'], {})
	price.innerText = beforePrice
	fullBeforePrice.innerText = '$'
	fullBeforePrice.prepend(price)

	if (needSizes) {
		generateFastReviewSizeSystem(fullInfoWrap)
	}

	const buttonFullCart = document.createElement('button')
	buttonFullCart.classList.add('item-full__button-cart')
	buttonFullCart.innerText = 'Add to Cart'
	fullInfoWrap.append(buttonFullCart)

	buttonFullCart.addEventListener('click', () => {
		addToCartFastReview(title, currentPrice, id, source, needSizes, selectedSize)
	})

	close.addEventListener('click', () => {
		fullItem.remove()
		darkBack.remove()
	})
}

//Addes product to the cart in fast review window
function addToCartFastReview(title, currentPrice, id, source, needSizes, selectedSize) {
	if (!(localStorage.hasOwnProperty('cart'))) {
		return
	}
	if (needSizes && selectedSize === '') {
		chooseSizePopUp()
		return
	} else {
		let exist = existInStorage(id, needSizes, selectedSize)
		if (!exist) {
			if (needSizes) {
				addCardtoStorage(title, currentPrice, id, source, needSizes, selectedSize)
				draWNewCard(id, needSizes, selectedSize)
				selectedSize = ''
			} else {
				addCardtoStorage(title, currentPrice, id, source, needSizes)
				draWNewCard(id, needSizes)
			}
			increaseCartCount()
			changeTotalSum()
		} else {
			if (needSizes) {
				increaseItemCount(id, needSizes, selectedSize)
				selectedSize = ''
			} else {
				increaseItemCount(id, needSizes)
			}
		}
		addtoCartPopUp()
	}
}

//Generates size system in the product's fast review window
function generateFastReviewSizeSystem(wrapper) {
	const ulSizes = createElementTag('ul', ['item-full__sizes'], {})
	wrapper.append(ulSizes)
	const XS = createElementTag('li', ['item-full__size'], {})
	ulSizes.append(XS)
	const labelXS = createElementTag('label', ['size__value'], {})
	labelXS.innerText = 'XS'
	XS.append(labelXS)
	const S = createElementTag('li', ['item-full__size'], {})
	ulSizes.append(S)
	const labelS = createElementTag('label', ['size__value'], {})
	labelS.innerText = 'S'
	S.append(labelS)
	const M = createElementTag('li', ['item-full__size'], {})
	ulSizes.append(M)
	const labelM = createElementTag('label', ['size__value'], {})
	labelM.innerText = 'M'
	M.append(labelM)
	const L = createElementTag('li', ['item-full__size'], {})
	ulSizes.append(L)
	const labelL = createElementTag('label', ['size__value'], {})
	labelL.innerText = 'L'
	L.append(labelL)
	const XL = createElementTag('li', ['item-full__size'], {})
	ulSizes.append(XL)
	const labelXL = createElementTag('label', ['size__value'], {})
	labelXL.innerText = 'XL'
	XL.append(labelXL)

	selectSize(ulSizes)
}

//Selects the size, depending on the user's choice, to be added to the cart
function selectSize(sizes) {
	const allSizes = sizes.children

	for (const elem of allSizes) {
		elem.addEventListener('click', () => {
			elem.classList.toggle('item-full__size--selected')
			selectedSize = elem.firstElementChild.innerText
			for (let i = 0; i < allSizes.length; i++) {
				if (allSizes[i] !== elem) {
					if (allSizes[i].classList.contains('item-full__size--selected')) {
						allSizes[i].classList.remove('item-full__size--selected')
					}
				}
			}
		})
	}
}

//If user didn't choose the size, creats pop-up
function chooseSizePopUp() {
	const popup = document.createElement('p')
	popup.classList.add('pop-up')
	popup.innerText = 'Please, select the size'
	document.body.append(popup)
	setTimeout(() => {
		popup.remove()
	}, 2000)
}