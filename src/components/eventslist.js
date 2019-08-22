import {getFormatedDate} from '../utils';
import {getEvent} from './event';

const getEventsDay = function (day, dayEvents) {
  const newDate = new Date(Number(day));
  return `
  <li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${newDate.getDate()}</span>
      <time class="day__date" datetime="2019-03-18">${getFormatedDate(day, {month: `short`, year: `2-digit`})}</time>
    </div>

    <ul class="trip-events__list">
    ${dayEvents.map(getEvent)}
    </ul>
  </li>
  `;
};

const getEventsList = function (eventsByDate) {
  return `
    <ul class="trip-days">
      ${Object.keys(eventsByDate).map((it) => getEventsDay(it, eventsByDate[it])).join(``)}
    </ul>
  `;
};

export {getEventsList};
