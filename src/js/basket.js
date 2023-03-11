const basket = document.querySelector('.header__basket--wrapper');
const basketMenu = document.querySelector('.shopping__bag');
const basketBtn = document.querySelector('.header__basket');

//открывает корзину по клику
export const getBasket = basket.addEventListener('click', () => {
    basketBtn.classList.toggle('basket__active');
    basketMenu.classList.toggle('shopping__bag--active');
})

let cards = [];

//отрисовка карточек на странице
export const getCards = () => {
    cards = JSON.parse(localStorage.getItem('cart'));
    if (cards.length === 0) {
        const emptyBag = document.querySelector('.shopping__bag-empty');
        emptyBag.style.display = 'inline';
        const trashcan = document.querySelector('.shopping__bag-trashcan');
        trashcan.style.display = 'none';
        const total = document.querySelector('.shopping__bag-total');
        total.style.display = 'none';
    }
}

getCards()
//Вставить функцию записи в локал сторадж в функцию добавления товара в корзину 
localStorage.setItem('cart', JSON.stringify(cards));