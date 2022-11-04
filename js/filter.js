const mapFilters = document.querySelector('.map__filters');
const filterTypes = mapFilters.children;

const toggleMapFilter = () => {
  for(let filter of filterTypes) {
    filter.disabled = !filter.disabled;
  };
  mapFilters.classList.toggle('map__filters--disabled');
};

toggleMapFilter();
toggleMapFilter();