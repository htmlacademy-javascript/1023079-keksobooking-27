import {sendData} from './api.js';
import {resetMap} from './map.js';
import {clearFilter} from './filter.js';
import {isEscapeKey} from './util.js';
import {resetSlider} from './slider.js';

const bodyNode = document.body;
const offerForm = document.querySelector('.ad-form');
const submitButton = document.querySelector('.ad-form__submit');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const resetFormButton = document.querySelector('.ad-form__reset');
const avatarInput = document.querySelector('.ad-form-header__input');
const avatarPlace = document.querySelector('.ad-form-header__preview').querySelector('img');
const offerFormPhoto = document.querySelector('.ad-form__input');
const offerPhotoPreview = document.querySelector('.ad-form__photo');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

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

const makeSubmitButtonDisabled = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Выполняю...';
};

const makeSubmitButtonEnabled = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const clearForm = () => {
  offerForm.reset();
};

const onMessageEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    successMessage.remove();
    errorMessage.remove();
    window.removeEventListener('keydown', onMessageEscKeydown);
  }
};

const showSubmitFormMessage = (message) => {
  bodyNode.append(message);
  window.addEventListener('keydown', onMessageEscKeydown);
  window.onclick = () => message.remove();
};

const getSuccessfullSending = () => {
  clearForm();
  resetMap();
  clearFilter();
  resetSlider();
  showSubmitFormMessage(successMessage);
  makeSubmitButtonEnabled();
};

const getFailureSending = () => {
  showSubmitFormMessage(errorMessage);
  makeSubmitButtonEnabled();
};

offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  const isValid = pristine.validate();
  if(isValid) {
    makeSubmitButtonDisabled();
    sendData(getSuccessfullSending, getFailureSending, formData);
  }
});

resetFormButton.onclick = () => {
  clearForm();
  resetMap();
  clearFilter();
  resetSlider();
};

avatarInput.addEventListener('change', () => {
  const file = avatarInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    avatarPlace.src = URL.createObjectURL(file);
  }
});

offerFormPhoto.addEventListener('change', () => {
  const files = offerFormPhoto.files;

  for(const file of files) {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.style.width = '100px';
    img.style.height = '75px';
    offerPhotoPreview.append(img);
  }
});
