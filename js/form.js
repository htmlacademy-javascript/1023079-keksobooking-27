const offerForm = document.querySelector('.ad-form');

export const pristine = new Pristine(offerForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
}, true);


const GUESTS_FOR_ROOMS = {
  1: ['1', '2', '3'],
  2: ['2', '3'],
  3: ['3'],
  0: ['100']
};

export const MIN_PRICES_FOR_TYPES = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

//Находим нужные поля:
const titleField = document.querySelector('#title');
export const priceField = document.querySelector('#price');
const roomsNumber = document.querySelector('#room_number');
const placesNumber = document.querySelector('#capacity');
export const typeField = document.querySelector('#type');
const timeInField = document.querySelector('#timein');
const timeOutField = document.querySelector('#timeout');


//Функции валидации:
const validateTitle = () => titleField.value.length >= 30 && titleField.value.length <= 100;
const validatePrice = () => priceField.value >= MIN_PRICES_FOR_TYPES[typeField.value] && priceField.value <= 100000;

//Генерируем сообщение об ошибке:

const priceErrorMessage = () => `Не меньше ${MIN_PRICES_FOR_TYPES[typeField.value]} и не больше 100000`;

//Добавляем валидаторы:
pristine.addValidator(
  titleField,
  validateTitle,
  'От 30 до 100 символов'
);

pristine.addValidator(
  priceField,
  validatePrice,
  priceErrorMessage
);


//Функции, которая запускают валидацию:
const onTitleChange = () => {
  pristine.validate(titleField);
};


const onPriceChange = () => priceField.value && pristine.validate(priceField);


const getPlaceholderValue = () => {
  priceField.placeholder = MIN_PRICES_FOR_TYPES[typeField.value];
};

const makeTimeOutToTimeIn = () => {
  timeOutField.value = timeInField.value;
};

const makeTimeInToTimeOut = () => {
  timeInField.value = timeOutField.value;
};

//Вешаем обработчик, который следит за изменениями в форме, и когда они происходят, запускает валидацию:
titleField.addEventListener('change', onTitleChange);
typeField.addEventListener('change', getPlaceholderValue);
priceField.addEventListener('change', onPriceChange);
typeField.addEventListener('change', onPriceChange);
timeInField.addEventListener('change', makeTimeOutToTimeIn);
timeOutField.addEventListener('change', makeTimeInToTimeOut);


const hideInvalidRoomsValues = () => {
  roomsNumber.value = GUESTS_FOR_ROOMS[placesNumber.value][0];
  for (const roomNumber of roomsNumber.querySelectorAll('option')) {
    roomNumber.disabled = !GUESTS_FOR_ROOMS[placesNumber.value].includes(roomNumber.value);
  }
};


placesNumber.addEventListener('change', hideInvalidRoomsValues);

offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
