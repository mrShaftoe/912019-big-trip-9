import {AbstractComponent} from './abstract-component';

class Route extends AbstractComponent {
  constructor({start, end, points}) {
    super();
    this._start = start;
    this._end = end;
    this._points = points;
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
