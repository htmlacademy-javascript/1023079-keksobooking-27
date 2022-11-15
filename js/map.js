import {toggleForm, toggleMapFilter} from './toggle_status.js';
import {makePopupFilled} from './popup.js';
import {getData} from './api.js';

const addressField = document.querySelector('#address');

export const map = L.map('map-canvas')
  .on('load', toggleForm())
  .on('load', toggleMapFilter())
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

export const usualIcon = L.icon({
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


mainMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  addressField.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
});

export const renderBalloons = (objects) => {
  objects.forEach((object) => {

    const usualMarker = L.marker(
      {
        lat: object.location.lat,
        lng: object.location.lng
      },
      {
        icon: usualIcon
      }
    );

    usualMarker
      .addTo(map)
      .bindPopup(makePopupFilled(object));
  });
};

export const resetMap = () => {
  mainMarker.setLatLng({
    lat: 35.66023,
    lng: 139.73007
  });
  map.setView({
    lat: 35.66023,
    lng: 139.73007
  }, 10);
  map.closePopup();
};

getData(renderBalloons);