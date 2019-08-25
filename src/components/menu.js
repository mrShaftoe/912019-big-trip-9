import {capitalize, createElement} from '../utils';

class MenuItem {
  constructor({name, isActive}) {
    this._name = name;
    this._isActive = isActive;
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
    return `<a class="trip-tabs__btn  ${this._isActive ? `trip-tabs__btn--active` : ``}" href="#">
    ${capitalize(this._name)}
  </a>`.trim();
  }
}

export {MenuItem};

