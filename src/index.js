/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    if (!Array.isArray(array)) {
        return 'Нужно передать массив'
    }

    if (array.length === 0) {
        return 'Вы передали пустой массив';
    }

    if (typeof(fn) !== 'function') {
        return 'Нужно передать функцию'
    }

    for (let i = 0; i < array.length; i++) {
        fn(array[i], i ,array);
    }
}
/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
	if (!Array.isArray(array)) {
        return 'Нужно передать массив'
    }
    
    if (array.length === 0) {
        return 'Вы передали пустой массив';
    }

    if (typeof(fn) !== 'function') {
      return 'Нужно передать функцию'
    }

    let newArray = [];

    for (let i = 0; i < array.length; i++) {
        newArray.push(fn(array[i], i ,array));
    }

    return newArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
	if (!Array.isArray(array)) {
        return 'Нужно передать массив'
    }
    
    if (array.length === 0) {
        return 'Вы передали пустой массив';
    }

    if (typeof(fn) !== 'function') {
      return 'Нужно передать функцию'
    }

    let acc = initial === undefined ? 0 : initial;
    let prev;
    let current;

    for (let i = 0; i < array.length; i++) {
        current = array[i];
        if (i === 0) {
      	    prev = initial ? initial : array[0];
        } 
      
        if (i === 1) {
            prev = initial ? initial + array[0] : array[0];
        }

        if (i > 1) {
             prev = acc;
        }

        console.log(`prev is ${prev}`);
        console.log(`current is ${current}`);


        acc = fn(prev, current, i, array);
    }  
    
    return acc;
}


/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  let array = [];

  for (var key in obj) {
    array.push(key.toUpperCase());
  }

  return array;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */

function slice(array, from = 0, to = array.length) {
  let newArray = [];

  if (from < 0 && Math.abs(from) <= array.length) {
    from = array.length + from;
  }

  if (from < 0 && Math.abs(from) > array.length) {
  	from = 0;
  }

  if (to < 0) {
    to = array.length + to;
  }

  if ( typeof(from) !== 'number') {
    from = 0;
  }

  if (from > array.length) {
    return [];
  }

  if (to > array.length) {
  	to = array.length;
  }

  if (to < from || to === from) {
    return [];
  }

  
  for (let i = from; i < to; i++) {
    newArray.push(array[i]);
  }

  return newArray;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
//function createProxy(obj) {
//}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
