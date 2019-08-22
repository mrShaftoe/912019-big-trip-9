import {capitalize} from '../utils';

const getFilter = function ({name, isChecked}) {
  return `
    <div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${name}">${capitalize(name)}</label>
    </div>
  `;
};

const getFilters = function (filters) {
  return `
  <form class="trip-filters" action="#" method="get">
    ${filters.map(getFilter).join(``)}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
  `;
};

export {getFilters};
