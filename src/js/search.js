export function search() {
    const input = document.querySelector(".header__search");
    const filter = input.value.toUpperCase();
    const titles = document.querySelectorAll(".item__title");
    //Создать переменную c boolean значением (флаг-переменная), которая будет сигналом для выдачи фразы "Not found"

    for (let i = 0; i < titles.length; i++) {
        let elem = titles[i]
        let modifyElem = elem.innerText.toUpperCase();

        if (filter !== '') {
            if (modifyElem.includes(filter)) {
                let str = elem.innerText
                let position = modifyElem.search(filter)
                elem.innerHTML = insertMark(str, position, input.value.length)
                elem.parentElement.style.display = '';
                /*Для условия, когда совпадения найдены или когда пользователь ничего не ввёл
                меняем переменную, чтобы она не подходила под условие вывода фразы not found*/
            }
            else {
                elem.parentElement.style.display = 'none';
            }
        } else {
            //Показывает все товары
            elem.parentElement.style.display = '';
            elem.innerHTML = elem.innerText
        }
    }

    //Условие для вывода фразы not found
    if (/* вставить переменную */true) {
        //построить параграф с фразой "Not found" в разделе "trends"
    }

    //Подсвечиваем совпадения
    function insertMark(str, pos, leng) {
        let before = str.slice(0, pos)
        let userInput = str.slice(pos, pos + leng)
        let after = str.slice(pos + leng)
        return before + '<span class="mark">' + userInput + '</span>' + after
    }

    //Это надо будет для выпадающей строки(режим живого поиска)

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

const input = document.querySelector(".header__search");
input.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
        magicGlass.click();
    }
})