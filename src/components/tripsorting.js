import {createElement, capitalize} from '../utils';

const getMenuItem = function ({name, isChecked}) {
  return `
    <div class="trip-sort__item  trip-sort__item--${name}">
      <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${isChecked ? `checked` : ``}>
      <label class="trip-sort__btn" for="sort-${name}">${capitalize(name)}</label>
    </div>
  `;
};
class Sorting {
  constructor(sortOptions) {
    this._sortOptions = sortOptions;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `
      <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        <span class="trip-sort__item  trip-sort__item--day">Day</span>
        ${this._sortOptions.map(getMenuItem)}
        <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
      </form>
    `.trim();
  }
}

export {Sorting};
