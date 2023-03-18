import { generateCartItem } from './addToCart.js'

const basket = document.querySelector('.header__basket--wrapper');
const basketMenu = document.querySelector('.shopping__bag');
const basketBtn = document.querySelector('.header__basket');

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
export function getCard(idItem) {
    if (!(localStorage.hasOwnProperty('cart'))) {
        return
    }
    cards = JSON.parse(localStorage.getItem('cart'));
    changeCart(cards)
    for (const elem of cards) {
        if (elem.id === idItem) {
            generateCartItem(elem.title, elem.currentPrice, elem.imgSrc, elem.count, elem.id)
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
        generateCartItem(cards[i].title, cards[i].currentPrice, cards[i].imgSrc, cards[i].count, cards[i].id)
    }
}

getCards()
localStorage.setItem('cart', JSON.stringify(cards));

// Сумма всех товаров (тоже надо связать с нажатием на + и -)
export function allItemsSum (){
    const total = document.querySelector('.shopping__bag-total');
    const itemsArray = document.querySelectorAll('.card__price');
    let prices = []
    itemsArray.forEach((elem) => {
        let strElem = elem.innerText.split('$').join('');
        let numElem = Number(strElem)
        prices.push(numElem)
})
const sumOfPrices = prices.reduce((acc, number) => acc + number, 0);
total.innerText = 'Total:' + sumOfPrices + '$';
}
allItemsSum()