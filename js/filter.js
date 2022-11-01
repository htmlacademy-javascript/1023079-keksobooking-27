const mapFilters = document.querySelector('.map__filters');
const filterTypes = mapFilters.children;

const makeMapFilterInactive = () => {
  for(let filter of filterTypes) {
    filter.disabled = true;
  };
  mapFilters.classList.add('map__filters--disabled');
};

const makeMapFilterActive = () => {
  for(let filter of filterTypes) {
    filter.disabled = false;
  };
  mapFilters.classList.remove('map__filters--disabled');
};

makeMapFilterInactive();