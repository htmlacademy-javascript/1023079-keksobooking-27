// Ищем целое число, затем проверяем некоторые условия
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

console.log(getRandomIntModified(2, 4));


// Теперь ищем случайное число в заданном дипазоне с нужным количеством символов после запятой

const getNumberWithFloats = (min, max, floatsNumber) => {
  const multiplier = 10 ** floatsNumber;
  return Math.trunc((Math.random() * (max - min) + min) * multiplier) / multiplier;
};

getNumberWithFloats(3, 5, 8);
