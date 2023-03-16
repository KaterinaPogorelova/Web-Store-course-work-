export function search() {
    const input = document.querySelector(".header__search");
    const filter = input.value.toUpperCase();
    const titles = document.querySelectorAll(".item__title");

    for (let i = 0; i < titles.length; i++) {
        let elem = titles[i]
        let modifyElem = elem.innerText.toUpperCase();

        if (filter !== ''){
            if (modifyElem.includes(filter)){
                elem.parentElement.style.display = '';
            }
            else {
                elem.parentElement.style.display = 'none';
            }
        } else {
            //попап - Введите текст
        }
    }

    // input.oninput = () => {
    //     let val = input.value;
    //     if (val !== '') {
    //         titles.forEach(function (elem) {
    //             if (elem.innerText.search(val) === -1) {
    //                 elem.parentElement.style.display = 'none';
    //                 // elem.innerHTML = elem.innerText;
    //             } else {
    //                 elem.parentElement.style.display = '';
    //                 // let str = elem.innerText;
    //                 // let position = elem.innerText.search(val);
    //                 // elem.innerHTML = insertMark(str, position, val.length);
    //             }
    //         })
    //     } else {
    //         titles.forEach(function (elem) {
    //             elem.parentElement.style.display = '';
    //     //         elem.innerHTML = elem.innerText;
    //         })
    //     }
    // }
}

const magicGlass = document.querySelector('.header__search-button');
magicGlass.addEventListener('click', search)
