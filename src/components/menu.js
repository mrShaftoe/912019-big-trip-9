import {capitalize} from '../utils';

const getMenuItem = function ({name, isActive}) {
  return `<a class="trip-tabs__btn  ${isActive ? `trip-tabs__btn--active` : ``}" href="#">
    ${capitalize(name)}
  </a>`;
};

const getMenu = function (items) {
  return `
    <nav class="trip-controls__trip-tabs  trip-tabs">
      ${items.map(getMenuItem).join(``)}
    </nav>
  `;
};

export {getMenu};

