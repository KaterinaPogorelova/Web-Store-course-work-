const input = document.querySelector(".header__search");
const searchBtn = document.querySelector('.header__search-button');

//Search bar
searchBtn.addEventListener('click', () => {
    const input = document.querySelector(".header__search");
    const upperValue = input.value.toUpperCase();
    const titles = document.querySelectorAll(".item__title");
    const sectionTitle = document.querySelector('.trends__title');
    const titleNotFound = document.querySelector('.trends__not-found');

    let notFound = true;

    for (let i = 0; i < titles.length; i++) {
        let title = titles[i]
        let upperTitle = title.innerText.toUpperCase();

        if (upperValue !== '') {
            if (upperTitle.includes(upperValue)) {
                let str = title.innerText
                let position = upperTitle.search(upperValue)
                title.innerHTML = insertMark(str, position, input.value.length)

                notFound = false;

                title.parentElement.style.display = '';
                sectionTitle.style.display = 'block';
                titleNotFound.style.display = 'none';
            }
            else {
                title.parentElement.style.display = 'none';
            }
        } else {
            title.innerHTML = title.innerText;

            notFound = false;

            title.parentElement.style.display = '';
            sectionTitle.style.display = 'block';
            titleNotFound.style.display = 'none';
        }
    }

    //Condition for the output of the phrase "not found"
    if (notFound) {
        sectionTitle.style.display = 'none';
        titleNotFound.style.display = 'block';
    }
})

//Highlight the matches
function insertMark(str, pos, leng) {
    let before = str.slice(0, pos)
    let userInput = str.slice(pos, pos + leng)
    let after = str.slice(pos + leng)
    return before + '<span class="mark">' + userInput + '</span>' + after
}


//Animates key "enter"
input.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
        searchBtn.click();
    }
})