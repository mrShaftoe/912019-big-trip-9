import {getFormatedDate} from '../utils';
import {AbstractComponent} from './abstract-component';

class EventsDay extends AbstractComponent {
  constructor(date) {
    super();
    this._date = Number(date);
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
