import {OBJECTS_COUNT, OFFER_TITLE, MIN_PRICE, MAX_PRICE, MIN_ROOMS, MAX_ROOMS, MIN_GUESTS, MAX_GUESTS, MIN_LAT, MAX_LAT,MIN_LNG, MAX_LNG, DESCRIPTION, OFFER_TYPE, avatarsList, PHOTOS_LIST, CHECKIN_OPTIONS, CHECKOUT_OPTIONS, FEATURES_LIST} from './data.js';

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
  `${getNumberWithFloats(MIN_LAT, MAX_LAT, 5)}, ${getNumberWithFloats(MIN_LNG, MAX_LNG, 5)}`;


// Функция, которая выбирает случайный элемент массива:
const getRandomArrayElement = (elements) => elements[getRandomIntModified(0, elements.length - 1)];

//Функция, которая выбирает аватар:
const getRandomAvatar = (elements) => {
  const elementIndex = getRandomIntModified(0, elements.length - 1);
  return elements.splice(elementIndex, 1).join('');
};

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
};


// Функция, которая создает значение author:
const getObjectAuthor = () =>({
  avatar: getRandomAvatar(avatarsList)
});

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
});


//Функция, которая собирает объект целиком:
const getWholeObject = () => ({
  author: getObjectAuthor(),
  offer: getObjectOffer(),
  location: getCoordinats()
});


//Функция, которая собирает массив из 10 объектов:
export const getArrayOfObjects = () => Array.from({length: OBJECTS_COUNT}, getWholeObject);

