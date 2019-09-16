/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

function createCell(cookies) {
    if (document.cookie === '') {
        return '';
    }

    while (listTable.firstChild) {
        listTable.removeChild(listTable.firstChild);
    }

    for (let key in cookies) {
        if (cookies.hasOwnProperty(key)) {

            let tr = document.createElement('tr');
            let deleteCell = document.createElement('td');

            listTable.appendChild(tr);
            tr.appendChild(document.createElement('td')).textContent = key;
            tr.appendChild(document.createElement('td')).textContent = cookies[key];
            deleteCell.className = 'delete';
            deleteCell.textContent = 'удалить';
            tr.appendChild(deleteCell);
        }
    }
}

// функция для получения массива со всеми куками
function getCookies() {

    let cookies;

    cookies = document.cookie.split('; ').reduce((prev, current) => {

        let [name, value] = current.split('=');

        prev[name] = value;

        return prev;
    }, {});

    return cookies;
}

// тображаем все куки после загрузки страницы
window.addEventListener('load', function() {

    createCell(getCookies());
});

function isMatching(full, chunk) {

    full = full.toUpperCase();
    chunk = chunk.toUpperCase();

    return full.includes(chunk);
}

let cookies = getCookies();

filterNameInput.addEventListener('keyup', function() {

    while (listTable.firstChild) {
        listTable.removeChild(listTable.firstChild);
    }

    if (filterNameInput.value === '') {
        createCell(getCookies());
    }

    for (let key in cookies) {

        if (isMatching(cookies[`${key}`], filterNameInput.value) || isMatching(`${key}`, filterNameInput.value)) {
            let tr = document.createElement('tr');
            let deleteCell = document.createElement('td');

            listTable.appendChild(tr);
            tr.appendChild(document.createElement('td')).textContent = key;
            tr.appendChild(document.createElement('td')).textContent = cookies[key];
            deleteCell.className = 'delete';
            deleteCell.textContent = 'удалить';
            tr.appendChild(deleteCell);
        }
  }
    
});


addButton.addEventListener('click', () => {

    let cookies = getCookies();

    for (let key in cookies) {
        if (key === addNameInput.value) {
            cookies[key] = addValueInput.value;
        }
    }

    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    createCell(getCookies());
});