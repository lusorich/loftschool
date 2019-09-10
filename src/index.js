/* ДЗ 4 - работа с DOM */


/*
 Задание 1:

 Функция должна добавлять обработчик fn события eventName к элементу target

 Пример:
   addListener('click', document.querySelector('a'), () => console.log('...')) // должна добавить указанный обработчик кликов на указанный элемент
 */
function addListener(eventName, target, fn) {

    target.addEventListener(eventName, fn);

 1.1: Функция должна создать элемент с тегом DIV

 1.2: В созданный элемент необходимо поместить текст, переданный в параметр text

 Пример:
   createDivWithText('loftschool') // создаст элемент div, поместит в него 'loftschool' и вернет созданный элемент
 Задание 2:

 Функция должна удалять у элемента target обработчик fn события eventName

 Пример:
   removeListener('click', document.querySelector('a'), someHandler) // должна удалить указанный обработчик кликов на указанный элемент

 Задание 3:


 Функция должна добавить к элементу target такой обработчик на события eventName, чтобы он отменял действия по умолчанию

 Пример:
   skipDefault('click', document.querySelector('a')) // после вызова функции, клики на указанную ссылку не должны приводить к переходу на другую страницу
 Задание 4:


 Функция должна эмулировать событие click для элемента target

 Пример:
   emulateClick(document.querySelector('a')) // для указанного элемента должно быть сэмулировано события click

   findError(document.body) // функция должна вернуть массив с элементами 'привет' и 'loftschool'
 Задание 5:


 Функция должна добавить такой обработчик кликов к элементу target,
 который реагирует (вызывает fn) только на клики по элементам BUTTON внутри target

 Пример:
   delegate(document.body, () => console.log('кликнули на button')) // добавит такой обработчик кликов для body, который будет вызывать указанную функцию только если кликнули на кнопку (элемент с тегом button)
function deleteTextNodes(where) {

    for (let child of where.childNodes) {
        if (child.nodeType === 3) {
            child.remove();
        }
    }
}

/*
 Задание 6:

<<<<<<< HEAD
 Функция должна добавить такой обработчик кликов к элементу target,
 который сработает только один раз и удалится (перестанет срабатывать для последующих кликов по указанному элементу)

 Пример:
   once(document.querySelector('button'), () => console.log('обработчик выполнился!')) // добавит такой обработчик кликов для указанного элемента, который вызовется только один раз и затем удалится
 */
function once(target, fn) {

    target.addEventListener('click', function bar() {
        fn();
        target.removeEventListener('click', bar, false);

 Выполнить предудыщее задание с использование рекурсии - то есть необходимо заходить внутрь каждого дочернего элемента (углубляться в дерево)

 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
   должно быть преобразовано в <span><div><b></b></div><p></p></span>



 Задание 7 *:

 Необходимо собрать статистику по всем узлам внутри элемента переданного в параметре root и вернуть ее в виде объекта
 Статистика должна содержать:
 - количество текстовых узлов
 - количество элементов каждого класса
 - количество элементов каждого тега
 Для работы с классами рекомендуется использовать classList
 Постарайтесь не создавать глобальных переменных

 Пример:
   Для дерева <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
   должен быть возвращен такой объект:
   {
     tags: { DIV: 1, B: 2},
     classes: { "some-class-1": 2, "some-class-2": 1 },
     texts: 3
   }
 
function collectDOMStat(root) {

    let stat = {
        tags: {},
        classes: {},
        texts: 0,
    };

    function nodesRecursive(root) {

        for (let i = 0; i < root.childNodes.length; i++) {

            let child = root.childNodes[i];
            let childNodeName = child.nodeName;
            
            if (child.nodeType === 1) {

                if (stat.tags.hasOwnProperty(childNodeName)) {

                    stat.tags[childNodeName]++;
                } else {

                    stat.tags[childNodeName] = 1;
                }
                for (let i = 0; i < child.classList.length; i++) {

                    let childClassName = child.classList[i];
                    
                    if (stat.classes.hasOwnProperty(childClassName)) {

                        stat.classes[childClassName]++;
                    } else {

                        stat.classes[childClassName] = 1;
                    }
                }

            } else if (child.nodeType === 3) {
                stat.texts++;
            }

            if (child.nodeType === 1) {
                nodesRecursive(child);
            }
        }
    }
    
    nodesRecursive(root);

    return stat;
}


 Задание 8 *:

 8.1: Функция должна отслеживать добавление и удаление элементов внутри элемента переданного в параметре where
 Как только в where добавляются или удаляются элементы,
 необходимо сообщать об этом при помощи вызова функции переданной в параметре fn

 8.2: При вызове fn необходимо передавать ей в качестве аргумента объект с двумя свойствами:
   - type: типа события (insert или remove)
   - nodes: массив из удаленных или добавленных элементов (в зависимости от события)

 8.3: Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов

 Рекомендуется использовать MutationObserver

 Пример:
   Если в where или в одного из его детей добавляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'insert',
     nodes: [div]
   }


   Если из where или из одного из его детей удаляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'remove',
     nodes: [div]
   }
function observeChildNodes(where, fn) {

    let obj = {
        nodes: [],
    };

    let observer = new MutationObserver( (mutationRecords) => {

        mutationRecords.forEach((mutationRecord) => {

            let eventType = mutationRecord.addedNodes.length || mutationRecord.removedNodes.length;

            for (let i = 0; i < eventType; i ++) {
                if (mutationRecord.addedNodes.length) {
                    obj.type = 'insert';
                    obj.nodes.push(mutationRecord.addedNodes[i]);
                } else {
                    obj.type = 'remove';
                    obj.nodes.push(mutationRecord.removedNodes[i]);
                }
            }

            fn(obj);
        })
    });

    observer.observe(where, {
        childList: true,
        subtree: true,
        characterDataOldValue: false,
        characterData: false
    });
}

export {
    createDivWithText,
    prepend,
    findAllPSiblings,
    findError,
    deleteTextNodes,
    deleteTextNodesRecursive,
    collectDOMStat,
    observeChildNodes
};
