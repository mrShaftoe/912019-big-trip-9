import {getFormatedDate, createElement} from '../utils';

class EventsDay {
  constructor(date) {
    this._date = Number(date);
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
    const newDate = new Date(this._date);
    return `
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${newDate.getDate()}</span>
          <time class="day__date" datetime="${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}">
          ${getFormatedDate(this._date, {month: `short`, year: `2-digit`})}</time>
        </div>

        <ul class="trip-events__list">
        </ul>
      </li>
    `.trim();
  }
}

export {EventsDay};
