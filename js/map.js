import {offersArr, makePopupFilled} from './popup.js';

// import {toggleForm, toggleMapFilter} from './toggle_status';
// .on('load', toggleForm())
//   .on('load', toggleMapFilter())

const addressField = document.querySelector('#address');

const map = L.map('map-canvas')
  .setView({
    lat: 35.66023,
    lng: 139.73007
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//Задаем иконки:
const mainIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52]
});

const usualIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

//Задаем маркеры:
const mainMarker = L.marker(
  {
    lat: 35.66023,
    lng: 139.73007
  },
  {
    draggable: true,
    icon: mainIcon
  }
);

mainMarker.addTo(map);


offersArr.forEach((object) => {

  const addressArr = object.offer.address.split(', ');
  const usualMarker = L.marker(
    {
      lat: addressArr[0],
      lng: addressArr[1]
    },
    {
      icon: usualIcon
    }
  );

  usualMarker
    .addTo(map)
    .bindPopup(makePopupFilled(object));
});


mainMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  addressField.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
});

