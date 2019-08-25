import {createElement} from '../utils';

class TripDays {
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
      <ul class="trip-days"></ul>
    `.trim();
  }
}

export {TripDays};
