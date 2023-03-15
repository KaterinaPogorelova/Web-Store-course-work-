
export const counter = document.querySelector('.header__basket-elem');


// счётчик значка на корзине
export function countItems(cards) {
    cards = JSON.parse(localStorage.getItem('cart'))
    if (cards.length !== 0) {
        let item = 0
        for (const card of cards) {
            item += card.count
            counter.textContent = item
        }
    } else {
        counter.style.display = 'none'
    }
}

countItems()

