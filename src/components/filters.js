import {capitalize, createElement} from '../utils';

class Filter {
  constructor({name, isChecked}) {
    this._name = name;
    this._isChecked = isChecked;
    this._element = null;
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
      <div class="trip-filters__filter">
        <input id="filter-${this._name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${this._name}" ${this._isChecked ? `checked` : ``}>
        <label class="trip-filters__filter-label" for="filter-${this._name}">${capitalize(this._name)}</label>
      </div>
    `.trim();
  }

}

export {Filter};
