export const filter = document.querySelector('.map__filters');
export const typeFilter = filter.querySelector('#housing-type');
export const priceFilter = filter.querySelector('#housing-price');
export const roomsFilter = filter.querySelector('#housing-rooms');
export const guestsFilter = filter.querySelector('#housing-guests');
export const featuresFilter = document.querySelector('#housing-features');

export const clearFilter = () => {
  filter.reset();
};

export const getFilteredByType = (object) => {
  if(typeFilter.value === 'any') {
    return true;
  }

  return typeFilter.value === object.offer.type;
};

const getFilteredByPrice = (object) => {
  switch(priceFilter.value) {
    case 'any':
      return true;
    case 'low':
      return object.offer.price <= 10000;
    case 'middle':
      return object.offer.price > 10000 <= object.offer.price <= 50000;
    case 'high':
      return object.offer.price > 50000;
  }
};

export const getFilteredByRooms = (object) => {
  if(roomsFilter.value === 'any') {
    return true;
  }

  return Number(roomsFilter.value) === object.offer.rooms;
};

export const getFilteredByGuests = (object) => {
  if(guestsFilter.value === 'any') {
    return true;
  }

  return Number(guestsFilter.value) === object.offer.guests;
};

const getFilteredByFeatures = (object) => {
  const selectedFeatures = featuresFilter.querySelectorAll('[type = "checkbox"]:checked');
  const selectedFeaturesValues = Array.from(selectedFeatures).map((item) => item.value);

  return selectedFeaturesValues.every((feature) => object.offer.features && object.offer.features.includes(feature));
};

export const getFilteredByAll = (object) => getFilteredByType(object) && getFilteredByRooms(object) && getFilteredByGuests(object) && getFilteredByPrice(object) && getFilteredByFeatures(object);
