import {getArrayOfObjects} from './util.js';

const renderPlace = document.querySelector('#map-canvas');

//Создаем массив объектов с предложениями аренды
const offersArr = getArrayOfObjects();

//Находим шаблон объявления
const offerTemplate = document.querySelector('#card').content.querySelector('.popup');

//Оставляем только нужные features:
const saveOnlyRealFeature = (features, element) => {
  const fullFeaturesNames = features.map((feature) => `popup__feature--${feature}`);
  const allFeatures = element.querySelector('.popup__features').querySelectorAll('.popup__feature');
  if (features) {
  allFeatures.forEach((feature) => {
    const modifier = feature.classList[1];

    if (!fullFeaturesNames.includes(modifier)) {
      feature.remove();
    }
  });
} else element.querySelector('.popup__features').classList.add('visually-hidden')
};

//Добавляем фото:
const loadPhotos = (element, photos) => {
    const photosContainer = element.querySelector('.popup__photos');
    if(photos) {
    photos.forEach((photo) => {
      const photoTemplate = photosContainer.querySelector('.popup__photo').cloneNode(true);
      photoTemplate.src = photo;
      photosContainer.appendChild(photoTemplate);
    });
  } else {
    photosContainer.classList.add('visually-hidden');
  }
  photosContainer.querySelector('.popup__photo').remove();
}



//Массив готовых объектов:
let resultArr = [];

//Заполняем шаблоны для каждого предложения
offersArr.forEach(({author, offer}) => {

  //Создаем карточку объявления:
  const similarOffer = offerTemplate.cloneNode(true);

//Функция, которая проверяет, есть ли значение:
const hasValue = (name, property, value) => {
  const element = similarOffer.querySelector(name);
  if (property) {
    element.textContent = value;
  } else {element.remove();
};
};
  //Получаем тип квартиры на русском:
  let offerType = '';
  switch(offer.type) {
    case 'palace':
      offerType = 'дворец';
      break;

    case 'flat':
      offerType = 'квартира';
      break;

    case 'house':
      offerType = 'дом';
      break;

    case 'bungalow':
      offerType = 'бунгало';
      break;

    case 'hotel':
      offerType = 'отель';
      break;
  }

  //Заполняем карточку



  hasValue('.popup__title', offer.title, offer.title);
  hasValue('.popup__text--address', offer.address, offer.address);
  hasValue('.popup__text--price', offer.price, `${offer.price} ₽/ночь`);
  hasValue('.popup__type', offer.type, offerType);
  hasValue('.popup__text--capacity', offer.guests, `${offer.rooms} комнаты для ${offer.guests} гостей`);
  hasValue('.popup__text--time', offer.checkin, `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  hasValue('.popup__description', offer.description, offer.description);

    if(author.avatar) {
  similarOffer.querySelector('.popup__avatar').src = author.avatar;
    } else similarOffer.querySelector('.popup__avatar').remove();

  saveOnlyRealFeature(offer.features, similarOffer);
  loadPhotos(similarOffer, offer.photos);

  resultArr.push(similarOffer);
});

renderPlace.appendChild(resultArr[0]);
