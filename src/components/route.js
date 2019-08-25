import {createElement} from '../utils';

class Route {
  constructor({start, end, points}) {
    this._start = start;
    this._end = end;
    this._points = points;
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
      <div class="trip-info__main">
        <h1 class="trip-info__title">
          ${this._points.join(` &mdash; `)}
        </h1>
        <p class="trip-info__dates">
        ${this._start.month} ${this._start.day}&nbsp;&mdash;&nbsp;${this._end.month === this._start.month ? `` : this._end.month} ${this._end.day}
        </p>
      </div>
    `.trim();
  }
}

export {Route};
