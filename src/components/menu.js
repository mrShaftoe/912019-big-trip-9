import {capitalize} from '../utils';
import {AbstractComponent} from './abstract-component';

class MenuItem extends AbstractComponent {
  constructor({name, isActive}) {
    super();
    this._name = name;
    this._isActive = isActive;
  }

  getTemplate() {
    return `<a class="trip-tabs__btn  ${this._isActive ? `trip-tabs__btn--active` : ``}" href="#">
    ${capitalize(this._name)}
  </a>`.trim();
  }
}

export {MenuItem};

