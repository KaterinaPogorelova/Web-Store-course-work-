import { changeCartCounter } from './basketCounter.js';
import { generateCartItem } from './addToCart.js';

const basket = document.querySelector('.header__basket--wrapper');
const basketMenu = document.querySelector('.shopping__bag');
const basketBtn = document.querySelector('.header__basket');
const clearbtn = document.querySelector('.shopping__bag-trashcan');


//Clear Button Animation
clearbtn.addEventListener('click', () => {
    let clearedCart = []
    localStorage.setItem('cart', JSON.stringify(clearedCart));

    const basket = document.querySelector('.shopping__bag-card--wrapper');
    basket.innerHTML = '';

    const counter = document.querySelector('.header__basket-elem');
    counter.innerText = '0'
    counter.style.display = 'none'

    changeCartAppear(clearedCart)
    changeTotalSum()
})

//Opens and closes cart's window
basket.addEventListener('click', () => {
    basketBtn.classList.toggle('basket__active');
    basketMenu.classList.toggle('shopping__bag--active');
})

//Changes the appearence of the cart depending on whether the item is there or not
export function changeCartAppear(cart) {
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

//Draws a newly added product card to cart
export function draWNewCard(idItem, needSizes, size) {
    if (!(localStorage.hasOwnProperty('cart'))) {
        return
    }
    cards = JSON.parse(localStorage.getItem('cart'));
    changeCartAppear(cards)
    for (const elem of cards) {
        if (elem.id === idItem) {
            if (needSizes) {
                if (elem.size === size) {
                    generateCartItem(elem.title, elem.currentPrice, elem.imgSrc, elem.count, elem.id, needSizes, size)
                }
            } else {
                generateCartItem(elem.title, elem.currentPrice, elem.imgSrc, elem.count, elem.id, needSizes)
            }
        }
    }
}

//Gets and draws all product cards from the local Storage
function getCards() {
    if (!(localStorage.hasOwnProperty('cart'))) {
        return
    }
    cards = JSON.parse(localStorage.getItem('cart'));
    changeCartAppear(cards)
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].hasOwnProperty('size')) {
            generateCartItem(cards[i].title, cards[i].currentPrice, cards[i].imgSrc, cards[i].count, cards[i].id, cards[i].needSizes, cards[i].size)
        } else {
            generateCartItem(cards[i].title, cards[i].currentPrice, cards[i].imgSrc, cards[i].count, cards[i].id, cards[i].needSizes)
        }
    }
    changeTotalSum()
    changeCartCounter()
}

// Changes TOTAL sum in the cart
export function changeTotalSum() {
    if (!(localStorage.hasOwnProperty('cart'))) {
        return
    }
    let cart = JSON.parse(localStorage.getItem('cart'));
    let totalSum = cart.reduce((acc, elem) => acc + elem.currentPrice * elem.count, 0);
    const total = document.querySelector('.shopping__bag-total');
    total.innerText = 'Total: ' + totalSum + '$';
}

let cards = [];
getCards()

localStorage.setItem('cart', JSON.stringify(cards));



