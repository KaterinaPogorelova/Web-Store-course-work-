import { generateItemFastReview } from './fastReview.js'
import { existInStorage, addToCart, changeCountNum, addtoCartPopUp } from './addToCart.js'
import { getCard } from './basket.js'
export const trendsItemWrapper = document.querySelector('.trends__item-wrapper')

export function renderCards({ title, currentPrice, beforePrice, imgSrc, needSizes, id }) {
    const trendsItem = document.createElement('div')
    trendsItem.className = "trends__item"
    trendsItemWrapper.append(trendsItem)
    trendsItem.id = id

    const ItemImgWrapper = document.createElement('div')
    ItemImgWrapper.className = "item__img-wrapper"
    trendsItem.append(ItemImgWrapper)
    const image = document.createElement('img')
    //Заменить ссылкой из мокапи
    image.src = imgSrc
    image.alt = title
    ItemImgWrapper.append(image)
    const buttonReview = document.createElement('button')
    buttonReview.className = "img-wrapper__button_review"
    ItemImgWrapper.append(buttonReview)
    buttonReview.textContent = 'FAST REVIEW'
    ItemImgWrapper.addEventListener('mouseover', () => {
        buttonReview.style.display = 'block'
    })
    ItemImgWrapper.addEventListener('mouseout', () => {
        buttonReview.style.display = 'none'
    })
    buttonReview.addEventListener('click', () => { generateItemFastReview(title, currentPrice, id, beforePrice, image.src, needSizes) })
    if (needSizes) {
        const sizesWrap = document.createElement('ul')
        sizesWrap.classList.add('img-wrapper__sizes')
        ItemImgWrapper.append(sizesWrap)
        const sizeLiXS = document.createElement('li')
        sizeLiXS.classList.add('sizes__size')
        sizesWrap.append(sizeLiXS)
        const btnXS = document.createElement('button')
        btnXS.classList.add('sizes__button')
        btnXS.innerText = 'XS'
        sizeLiXS.append(btnXS)
        const sizeLiS = document.createElement('li')
        sizeLiS.classList.add('sizes__size')
        sizesWrap.append(sizeLiS)
        const btnS = document.createElement('button')
        btnS.classList.add('sizes__button')
        btnS.innerText = 'S'
        sizeLiS.append(btnS)
        const sizeLiM = document.createElement('li')
        sizeLiM.classList.add('sizes__size')
        sizesWrap.append(sizeLiM)
        const btnM = document.createElement('button')
        btnM.classList.add('sizes__button')
        btnM.innerText = 'M'
        sizeLiM.append(btnM)
        const sizeLiL = document.createElement('li')
        sizeLiL.classList.add('sizes__size')
        sizesWrap.append(sizeLiL)
        const btnL = document.createElement('button')
        btnL.classList.add('sizes__button')
        btnL.innerText = 'L'
        sizeLiL.append(btnL)
        const sizeLiXL = document.createElement('li')
        sizeLiXL.classList.add('sizes__size')
        sizesWrap.append(sizeLiXL)
        const btnXL = document.createElement('button')
        btnXL.classList.add('sizes__button')
        btnXL.innerText = 'XL'
        sizeLiXL.append(btnXL)

        sizesWrap.addEventListener('click', () => {
            const sizeTarget = event.target.closest('button')
            let selectedSize = sizeTarget.innerText
            let exist = existInStorage(id, needSizes, selectedSize)
            if (!exist) {
                if (needSizes) {
                    addToCart(title, currentPrice, id, image.src, needSizes, selectedSize)
                    getCard(id, needSizes, selectedSize)
                    addtoCartPopUp()
                } else {
                    addToCart(title, currentPrice, id, image.src, needSizes)
                    getCard(id, needSizes)
                    addtoCartPopUp()
                }
            } else {
                changeCountNum(id, needSizes, selectedSize)
                addtoCartPopUp()
            }
            sizesWrap.classList.remove('img-wrapper__sizes--active')
        })
    }
    const buttonCard = document.createElement('button')
    buttonCard.className = "img-wrapper__button_cart-add"
    ItemImgWrapper.append(buttonCard)

    buttonCard.insertAdjacentHTML("afterbegin", '<svg width="34" height="34" viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg"> <path d="M31.6667 33.6667H2.33333C1.8471 33.6667 1.38079 33.4911 1.03697 33.1786C0.693154 32.866 0.5 32.4421 0.5 32V2.00004C0.5 1.55801 0.693154 1.13409 1.03697 0.821529C1.38079 0.508969 1.8471 0.333374 2.33333 0.333374H31.6667C32.1529 0.333374 32.6192 0.508969 32.963 0.821529C33.3068 1.13409 33.5 1.55801 33.5 2.00004V32C33.5 32.4421 33.3068 32.866 32.963 33.1786C32.6192 33.4911 32.1529 33.6667 31.6667 33.6667ZM29.8333 30.3334V3.66671H4.16667V30.3334H29.8333ZM11.5 7.00004V10.3334C11.5 11.6595 12.0795 12.9312 13.1109 13.8689C14.1424 14.8066 15.5413 15.3334 17 15.3334C18.4587 15.3334 19.8576 14.8066 20.8891 13.8689C21.9205 12.9312 22.5 11.6595 22.5 10.3334V7.00004H26.1667V10.3334C26.1667 12.5435 25.2009 14.6631 23.4818 16.2259C21.7627 17.7887 19.4312 18.6667 17 18.6667C14.5688 18.6667 12.2373 17.7887 10.5182 16.2259C8.7991 14.6631 7.83333 12.5435 7.83333 10.3334V7.00004H11.5Z" fill="#0D0D0E" /></svg>')

    buttonCard.addEventListener('click', () => {
        if (needSizes) {
            const sizesWrap = ItemImgWrapper.children[2]
            sizesWrap.classList.toggle('img-wrapper__sizes--active')
        } else {
            //Сначала вызывается функция и проверяет, есть ли уже такая карточка в localStorage
            let exist = existInStorage(id)
            if (!exist) {
                //Добавляет карточку в localStorage
                addToCart(title, currentPrice, id, image.src, needSizes)
                //Отрисовывает карточку в корзине
                getCard(id, needSizes)
                addtoCartPopUp()
            } else {
                //Изменяет свойство count в localStorage и визуально в корзине
                changeCountNum(id)
                addtoCartPopUp()
            }
        }
    })

    const sale = document.createElement('p')
    sale.className = "img-wrapper__sale"
    ItemImgWrapper.append(sale)
    sale.textContent = 'sale'

    const priceWrapper = document.createElement('div')
    priceWrapper.className = "item__price-wrapper"
    trendsItem.append(priceWrapper)

    const price = document.createElement('p')
    price.className = "item__price"
    priceWrapper.append(price)
    price.textContent = `${currentPrice}$`

    const priceBeforeSale = document.createElement('p')
    priceBeforeSale.className = "item__price item__price-before-sale"
    priceWrapper.append(priceBeforeSale)
    priceBeforeSale.textContent = `${beforePrice}$`

    const itemTitle = document.createElement('h3')
    itemTitle.className = "item__title"
    trendsItem.append(itemTitle)
    itemTitle.textContent = title
}



function getItems() {
    fetch(`https://6405d1c4eed195a99f8d974d.mockapi.io/api/items`)
        .then((response) => response.json())
        .then((json) => {
            for (const object of json) {
                renderCards(object)
            }
        })
        .catch(error => console.log(error))
}
getItems()