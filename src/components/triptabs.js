import {createElement} from '../utils';

class TripTabs {
  constructor() {
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
      <nav class="trip-controls__trip-tabs  trip-tabs"></nav>
    `.trim();
  }
}

export {TripTabs};
