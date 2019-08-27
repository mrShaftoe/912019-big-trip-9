import {AbstractComponent} from './abstract-component';
import {capitalize} from '../utils';

const getSortItem = function ({name, isChecked}) {
  return `
    <div class="trip-sort__item  trip-sort__item--${name}">
      <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${isChecked ? `checked` : ``}>
      <label class="trip-sort__btn" for="sort-${name}">${capitalize(name)}</label>
    </div>
  `;
};

class Sort extends AbstractComponent {
  constructor(sortOptions) {
    super();
    this._sortOptions = sortOptions;
  }

  getTemplate() {
    return `
      <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        <span class="trip-sort__item  trip-sort__item--day">Day</span>
        ${this._sortOptions.map(getSortItem)}
        <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
      </form>
    `.trim();
  }
}

export {Sort};
