const offerForm = document.querySelector('.ad-form');

const pristine = new Pristine(offerForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
}, true);

// const ROOMS_FOR_GUESTS = {
//   1: ['1'],
//   2: ['1', '2'],
//   3: ['1', '2', '3'],
//   4: ['0']
// };

const GUESTS_FOR_ROOMS = {
  1: ['1', '2', '3'],
  2: ['2', '3'],
  3: ['3'],
  0: ['100']
};

//Находим нужные поля:
const titleField = document.querySelector('#title');
const priceField = document.querySelector('#price');
const roomsNumber = document.querySelector('#room_number');
const placesNumber = document.querySelector('#capacity');


//Функции валидации:
const validateTitle = () => titleField.value.length >= 30 && titleField.value.length <= 100;

const validatePrice = () => priceField.value <= 100000;

//const validatePlaces = () => ROOMS_FOR_GUESTS[(roomsNumber.value)].includes(placesNumber.value);

//Генерируем сообщение об ошибке:
// const roomsErrorTextMessage = () => `Неверное количество комнат. В ${(roomsNumber.value)} комнат поместится ${ROOMS_FOR_GUESTS[roomsNumber.value].join(', ')} гостей`;

// const placesErrorMessage = () => `Неверное количество гостей. ${placesNumber.value} гостей поместится в ${GUESTS_FOR_ROOMS[placesNumber.value].join(', ')} комнат`;

//Добавляем валидаторы:
pristine.addValidator(
  titleField,
  validateTitle,
  'От 30 до 100 символов'
);

pristine.addValidator(
  priceField,
  validatePrice,
  'Не более 100000'
);

// pristine.addValidator(
//   roomsNumber,
//   validatePlaces,
//   roomsErrorTextMessage
// );

// pristine.addValidator(
//   placesNumber,
//   validatePlaces,
//   placesErrorMessage
// );

//Функции, которая запускают валидацию:
const onTitleChange = () => {
  pristine.validate(titleField);
};

const onPriceChange = () => {
  pristine.validate(priceField);
};

// const onPlacesChange = () => {
//   pristine.validate(placesNumber);
//   pristine.validate(roomsNumber);
// };

//Вешаем обработчик, который следит за изменениями в форме, и когда они происходят, запускает валидацию:
titleField.addEventListener('change', onTitleChange);
priceField.addEventListener('change', onPriceChange);
// roomsNumber.addEventListener('change', onPlacesChange);
// placesNumber.addEventListener('change', onPlacesChange);

const hideInvalidRoomsValues = () => {
  roomsNumber.value = GUESTS_FOR_ROOMS[placesNumber.value][0];
  for (const roomNumber of roomsNumber.querySelectorAll('option')) {
    if(GUESTS_FOR_ROOMS[placesNumber.value].includes(roomNumber.value)) {
      roomNumber.disabled = false;
    }
    else {
      roomNumber.disabled = true;
    }
  }
};


placesNumber.addEventListener('change', hideInvalidRoomsValues);
offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

