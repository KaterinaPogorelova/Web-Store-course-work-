const basket = document.querySelector('.header__basket--wrapper');
const basketMenu = document.querySelector('.shopping__bag');
const basketBtn = document.querySelector('.header__basket');

//открывает корзину по клику
export const getBasket = basket.addEventListener('click', () =>{
    basketBtn.classList.toggle('basket__active');
    basketMenu.classList.toggle('shopping__bag--active');
})

let cards = [];
localStorage.setItem('cart', JSON.stringify(cards));

//отрисовка карточек на странице
export const getCards = () => {
    cards = JSON.parse(localStorage.getItem('cart'));
    if (cards.length === 0){
        const emptyBag = document.querySelector('.shopping__bag-not__empty');
        emptyBag.classList.add('shopping__bag-empty');
        const trashcan = document.querySelector('.shopping__bag-trashcan');
        trashcan.classList.add('trashcan__empty');
        const total = document.querySelector('.shopping__bag-total');
        total.classList.add('total__empty');
    }
}

getCards()