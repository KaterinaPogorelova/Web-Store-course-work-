import { addCountItems } from './basketCounter.js';
import { generateCartItem } from './addToCart.js';
const basket = document.querySelector('.header__basket--wrapper');
const basketMenu = document.querySelector('.shopping__bag');
const basketBtn = document.querySelector('.header__basket');
const clearbtn = document.querySelector('.shopping__bag-trashcan');

clearbtn.addEventListener('click', () => {
    if (!(localStorage.hasOwnProperty('cart'))) {
        return
    }
    const basket = document.querySelector('.shopping__bag-card--wrapper');
    let clearedCart = []
    localStorage.setItem('cart', JSON.stringify(clearedCart));
    basket.innerHTML = ''
    const counter = document.querySelector('.header__basket-elem');
    counter.innerText = '0'
    counter.style.display = 'none'
    changeCart(clearedCart)
    allItemsSum()
})
//открывает корзину по клику
export const getBasket = basket.addEventListener('click', () => {
    basketBtn.classList.toggle('basket__active');
    basketMenu.classList.toggle('shopping__bag--active');
})

let cards = [];

//Изменяет внешний вид корзины в зависимости есть ли там товар, или нет
export function changeCart(cart) {
    if (cart.length === 0) {
        const emptyBag = document.querySelector('.shopping__bag-empty');
        emptyBag.style.display = 'inline';
        const trashcan = document.querySelector('.shopping__bag-trashcan');
        trashcan.style.display = 'none';
        const total = document.querySelector('.shopping__bag-total');
        total.style.display = 'none';
    }
    else {
        const emptyBag = document.querySelector('.shopping__bag-empty');
        emptyBag.style.display = 'none';
        const trashcan = document.querySelector('.shopping__bag-trashcan');
        trashcan.style.display = 'block';
        const total = document.querySelector('.shopping__bag-total');
        total.style.display = 'block';
    }
}

//Отрисовка только добавленной карточки товара в корзину и добавление её в localStorage
export function getCard(idItem, needSizes, size) {
    if (!(localStorage.hasOwnProperty('cart'))) {
        return
    }
    cards = JSON.parse(localStorage.getItem('cart'));
    changeCart(cards)
    for (const elem of cards) {
        if (elem.id === idItem) {
            if (needSizes) {
                if (size === undefined) {
                    generateCartItem(elem.title, elem.currentPrice, elem.imgSrc, elem.count, elem.id, needSizes, 'XS')
                } else {
                    if (elem.size === size) {
                        generateCartItem(elem.title, elem.currentPrice, elem.imgSrc, elem.count, elem.id, needSizes, size)
                    }
                }
            } else {
                generateCartItem(elem.title, elem.currentPrice, elem.imgSrc, elem.count, elem.id, needSizes)
            }
        }
    }
}

//Отрисовка карточек товаров из localStorage при перезагрузке
export const getCards = () => {
    if (!(localStorage.hasOwnProperty('cart'))) {
        return
    }
    cards = JSON.parse(localStorage.getItem('cart'));
    changeCart(cards)
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].size) {
            generateCartItem(cards[i].title, cards[i].currentPrice, cards[i].imgSrc, cards[i].count, cards[i].id, cards[i].needSizes, cards[i].size)
        } else {
            generateCartItem(cards[i].title, cards[i].currentPrice, cards[i].imgSrc, cards[i].count, cards[i].id, cards[i].needSizes)
        }
    }
}

getCards()

localStorage.setItem('cart', JSON.stringify(cards));

// Сумма всех товаров (работает только при перезагрузке страницы)
export function allItemsSum() {
    if (!(localStorage.hasOwnProperty('cart'))) {
        return
    }
    let cart = JSON.parse(localStorage.getItem('cart'));
    let totalSum = 0
    const total = document.querySelector('.shopping__bag-total');
    if (cart.length !== 0) {
        for (const elem of cart) {
            totalSum += (elem.currentPrice * elem.count)
        }
    }
    //const itemsArray = document.querySelectorAll('.card__price');
    // let prices = []
    /* itemsArray.forEach((elem) => {
        let strElem = elem.innerText.split('$').join('');
        let numElem = Number(strElem)
        prices.push(numElem)
    }) 
    const sumOfPrices = prices.reduce((acc, number) => acc + number, 0);*/
    total.innerText = 'Total: ' + totalSum + '$';
}

allItemsSum()
addCountItems()
//localStorage.setItem('cart', JSON.stringify(cards));

