import { createElementTag } from './elemCreator.js'
import { increaseCartCount } from './basketCounter.js'
import { generateItemFastReview } from './fastReview.js'
import { existInStorage, addCardtoStorage, increaseItemCount, addtoCartPopUp } from './addToCart.js'
import { draWNewCard, changeTotalSum } from './basket.js'

// Gets product cards from the server
function getProductCards() {
    fetch(`https://63fa41c1beec322c57f054bd.mockapi.io/items`)
        .then((response) => response.json())
        .then((json) => {
            for (const object of json) {
                renderCards(object)
            }
        })
        .catch(error => console.log(error))
}
getProductCards()

//Draws product cards on the page
function renderCards({ title, currentPrice, beforePrice, imgSrc, needSizes, id }) {
    const trendsItemWrapper = document.querySelector('.trends__item-wrapper')

    const trendsItem = createElementTag('div', ["trends__item"], { id: id })
    trendsItemWrapper.append(trendsItem)
    const ItemImgWrapper = createElementTag('div', ["item__img-wrapper"], {})
    trendsItem.append(ItemImgWrapper)
    const image = createElementTag('img', [], { src: imgSrc, alt: title })
    ItemImgWrapper.append(image)
    const buttonReview = createElementTag('button', ["img-wrapper__button_review"], {})
    ItemImgWrapper.append(buttonReview)
    buttonReview.textContent = 'FAST REVIEW'
    ItemImgWrapper.addEventListener('mouseover', () => {
        buttonReview.style.display = 'block'
    })
    ItemImgWrapper.addEventListener('mouseout', () => {
        buttonReview.style.display = 'none'
    })
    buttonReview.addEventListener('click', () => {
        generateItemFastReview(title, currentPrice, id, beforePrice, image.src, needSizes)
    })

    if (needSizes) {
        generateSizeSystem(ItemImgWrapper, title, currentPrice, imgSrc, needSizes, id)
    }
    const buttonCard = createElementTag('button', ["img-wrapper__button_cart-add"], {})
    ItemImgWrapper.append(buttonCard)

    buttonCard.insertAdjacentHTML("afterbegin", '<svg width="34" height="34" viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg"> <path d="M31.6667 33.6667H2.33333C1.8471 33.6667 1.38079 33.4911 1.03697 33.1786C0.693154 32.866 0.5 32.4421 0.5 32V2.00004C0.5 1.55801 0.693154 1.13409 1.03697 0.821529C1.38079 0.508969 1.8471 0.333374 2.33333 0.333374H31.6667C32.1529 0.333374 32.6192 0.508969 32.963 0.821529C33.3068 1.13409 33.5 1.55801 33.5 2.00004V32C33.5 32.4421 33.3068 32.866 32.963 33.1786C32.6192 33.4911 32.1529 33.6667 31.6667 33.6667ZM29.8333 30.3334V3.66671H4.16667V30.3334H29.8333ZM11.5 7.00004V10.3334C11.5 11.6595 12.0795 12.9312 13.1109 13.8689C14.1424 14.8066 15.5413 15.3334 17 15.3334C18.4587 15.3334 19.8576 14.8066 20.8891 13.8689C21.9205 12.9312 22.5 11.6595 22.5 10.3334V7.00004H26.1667V10.3334C26.1667 12.5435 25.2009 14.6631 23.4818 16.2259C21.7627 17.7887 19.4312 18.6667 17 18.6667C14.5688 18.6667 12.2373 17.7887 10.5182 16.2259C8.7991 14.6631 7.83333 12.5435 7.83333 10.3334V7.00004H11.5Z" fill="#0D0D0E" /></svg>')

    buttonCard.addEventListener('click', () => {
        btnaddProducttoCart(ItemImgWrapper, title, currentPrice, id, imgSrc, needSizes)
    })

    const sale = createElementTag('p', ["img-wrapper__sale"], {})
    sale.textContent = countPercent(currentPrice, beforePrice)
    ItemImgWrapper.append(sale)
    const priceWrapper = createElementTag('div', ["item__price-wrapper"], {})
    trendsItem.append(priceWrapper)
    const price = createElementTag('p', ["item__price"], {})
    price.textContent = `${currentPrice}$`
    priceWrapper.append(price)
    const priceBeforeSale = createElementTag('p', ["item__price", "item__price-before-sale"], {})
    priceBeforeSale.textContent = `${beforePrice}$`
    priceWrapper.append(priceBeforeSale)
    const itemTitle = createElementTag('h3', ["item__title"], {})
    itemTitle.textContent = title
    trendsItem.append(itemTitle)
}

//Generates size system, if it's needed
function generateSizeSystem(wrapper, title, currentPrice, imgSrc, needSizes, id) {
    const sizesWrap = createElementTag('ul', ['img-wrapper__sizes'], {})
    wrapper.append(sizesWrap)
    const sizeLiXS = createElementTag('li', ['sizes__size'], {})
    sizesWrap.append(sizeLiXS)
    const btnXS = createElementTag('button', ['sizes__button'], {})
    btnXS.innerText = 'XS'
    sizeLiXS.append(btnXS)
    const sizeLiS = createElementTag('li', ['sizes__size'], {})
    sizesWrap.append(sizeLiS)
    const btnS = createElementTag('button', ['sizes__button'], {})
    btnS.innerText = 'S'
    sizeLiS.append(btnS)
    const sizeLiM = createElementTag('li', ['sizes__size'], {})
    sizesWrap.append(sizeLiM)
    const btnM = createElementTag('button', ['sizes__button'], {})
    btnM.innerText = 'M'
    sizeLiM.append(btnM)
    const sizeLiL = createElementTag('li', ['sizes__size'], {})
    sizesWrap.append(sizeLiL)
    const btnL = createElementTag('button', ['sizes__button'], {})
    btnL.innerText = 'L'
    sizeLiL.append(btnL)
    const sizeLiXL = createElementTag('li', ['sizes__size'], {})
    sizesWrap.append(sizeLiXL)
    const btnXL = createElementTag('button', ['sizes__button'], {})
    btnXL.innerText = 'XL'
    sizeLiXL.append(btnXL)

    sizesWrap.addEventListener('click', () => {
        sizeaddProducttoCart(sizesWrap, title, currentPrice, id, imgSrc, needSizes)
    })
}

//Adds product to cart, (button animation)
function btnaddProducttoCart(wrapper, title, currentPrice, id, imgSrc, needSizes) {
    if (!(localStorage.hasOwnProperty('cart'))) {
        return
    }
    if (needSizes) {
        //Opens and closes sizes table only, clicking on needed size will add product to the cart 
        const sizesWrap = wrapper.children[2]
        sizesWrap.classList.toggle('img-wrapper__sizes--active')
    } else {
        let exist = existInStorage(id)
        if (!exist) {
            addCardtoStorage(title, currentPrice, id, imgSrc, needSizes)
            draWNewCard(id, needSizes)
            increaseCartCount()
        } else {
            increaseItemCount(id)
        }
        changeTotalSum()
        addtoCartPopUp()
    }
}

//Adds product to cart, (size buttons animation)
function sizeaddProducttoCart(sizesWrap, title, currentPrice, id, imgSrc, needSizes) {
    if (!(localStorage.hasOwnProperty('cart'))) {
        return
    }
    const sizeTarget = event.target.closest('button')
    let selectedSize = sizeTarget.innerText
    let exist = existInStorage(id, needSizes, selectedSize)
    if (!exist) {
        if (needSizes) {
            addCardtoStorage(title, currentPrice, id, imgSrc, needSizes, selectedSize)
            draWNewCard(id, needSizes, selectedSize)
        } else {
            addCardtoStorage(title, currentPrice, id, imgSrc, needSizes)
            draWNewCard(id, needSizes)
        }
        increaseCartCount()
    } else {
        increaseItemCount(id, needSizes, selectedSize)
    }
    changeTotalSum()
    addtoCartPopUp()
    sizesWrap.classList.remove('img-wrapper__sizes--active')
}

// Calculates the discount percentage
function countPercent(currentPrice, beforePrice) {
    return Math.round(100 - ((currentPrice / beforePrice) * 100)) + '%'
}