// Константы:

const OBJECTS_COUNT = 10;
const OFFER_TITLE = 'Nice apartments';
const MIN_PRICE = 100;
const MAX_PRICE = 10000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 5;
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
const DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'


const OFFER_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
]

const AVATARS_LIST = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
  'img/avatars/user09.png',
  'img/avatars/user10.png',
]

const PHOTOS_LIST = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
]

const CHECKIN_OPTIONS = ['12:00', '13:00', '14:00'];

const CHECKOUT_OPTIONS = ['12:00', '13:00', '14:00'];

const FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// Ищем целое число, затем проверяем некоторые условия:
const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max + 1 - min ) + min);

const getRandomIntModified = (min, max) => {
  if(min === max) {
    return NaN;
  }

  if(min < 0 || max < 0) {
    return NaN;
  }

  if (min > max) {
    const swap = min;
    min = max;
    max = swap;
  }

  return getRandomInt(min, max);
};


// Теперь ищем случайное число в заданном дипазоне с нужным количеством символов после запятой:
const getNumberWithFloats = (min, max, floatsNumber) => {
  const multiplier = 10 ** floatsNumber;
  return Math.trunc((Math.random() * (max - min) + min) * multiplier) / multiplier;
};

// Функция, которая генерирует координаты:
const getCoordinats = () =>
  getNumberWithFloats(MIN_LAT, MAX_LAT, 5) + ', ' + getNumberWithFloats(MIN_LNG, MAX_LNG, 5);


// Функция, которая выбирает случайный элемент массива:
const getRandomArrayElement = (elements) => elements[getRandomIntModified(0, elements.length - 1)];


//Функция, которая выбирает массив значений заданной длины (минимум 1) без повторений:
const getSomeValues = (elements) => {
  const valueAmount = getRandomIntModified(1, elements.length);
  let valuesArray = [];

  if (valueAmount === elements.length) {
    valuesArray = elements.slice();
    return valuesArray;
  }

  let newValuesList = elements.slice();

  for (let i = 0; i < valueAmount; i++) {
      let itemIndex = getRandomIntModified(0, newValuesList.length - 1);
      valuesArray.push(newValuesList[itemIndex]);
      newValuesList.splice(itemIndex, 1);
  }

  return valuesArray;
}


// Функция, которая создает значение author:
const getObjectAuthor = () =>({
    avatar: getRandomArrayElement(AVATARS_LIST)
})

// Функция, которая создает значение offer:
const getObjectOffer = () => ({
  title: OFFER_TITLE,
  address: getCoordinats(),
  price: getRandomIntModified(MIN_PRICE, MAX_PRICE),
  type: getRandomArrayElement(OFFER_TYPE),
  rooms: getRandomIntModified(MIN_ROOMS, MAX_ROOMS),
  guests: getRandomIntModified(MIN_GUESTS, MAX_GUESTS),
  checkin: getRandomArrayElement(CHECKIN_OPTIONS),
  checkout: getRandomArrayElement(CHECKOUT_OPTIONS),
  features: getSomeValues(FEATURES_LIST),
  description: DESCRIPTION,
  photos: getSomeValues(PHOTOS_LIST)
})


//Функция, которая собирает объект целиком:
const getWholeObject = () => ({
  author: getObjectAuthor(),
  offer: getObjectOffer(),
  location: getCoordinats()
})


//Функция, которая собирает массив из 10 объектов:
const getArrayOfObjects = Array.from({length: OBJECTS_COUNT}, getWholeObject);

console.log(getArrayOfObjects)
