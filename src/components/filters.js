import {capitalize} from '../utils';
import {AbstractComponent} from './abstract-component';

class Filter extends AbstractComponent {
  constructor({name, isChecked}) {
    super();
    this._name = name;
    this._isChecked = isChecked;
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
