import {groupEventsByDate, render} from '../utils';
import {Sort} from '../components/tripsort';
import {getSortItems} from '../components/data';
import {TripDays} from '../components/tripdays';
import {EventsDay} from '../components/eventsday';
import {Event, EventEdit, FirstEvent} from '../components/event';

class TripController {
  constructor(container, events) {
    this._container = container;
    this._events = events;
    this._eventsByDate = groupEventsByDate(events);
    this._sort = new Sort(getSortItems());
    this._days = new TripDays();
    this._firstEvent = new FirstEvent();
  }

  init() {
    if (!this._events.length) {
      render(this._container, this._firstEvent.getElement(), `beforeend`);
      return;
    }
    this._renderSort();
    render(this._container, this._days.getElement(), `beforeend`);
    this._renderDays();
  }

  _renderEvent(eventMock, eventDayContainer) {
    const event = new Event(eventMock);
    const eventEdit = new EventEdit(eventMock);

    const openEventEdit = function () {
      eventDayContainer.replaceChild(eventEdit.getElement(), event.getElement());
      document.addEventListener(`keydown`, onEscKeyPress);
    };

    const closeEventEdit = function (evt) {
      evt.preventDefault();
      eventDayContainer.replaceChild(event.getElement(), eventEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyPress);
    };

    const onEscKeyPress = function (evt) {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        closeEventEdit(evt);
      }
    };

    event.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, openEventEdit);
    eventEdit.getElement().querySelector(`.event--edit`).addEventListener(`submit`, closeEventEdit);
    eventEdit.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, closeEventEdit);

    render(eventDayContainer, event.getElement(), `beforeend`);
  }

  _renderDay(dayMock, dayEvents) {
    const day = new EventsDay(dayMock);
    render(this._days.getElement(), day.getElement(), `beforeend`);
    dayEvents.forEach((it) => this._renderEvent(it, day.getElement().querySelector(`.trip-events__list`)), `beforeend`);
  }

  _renderSort() {
    render(this._container, this._sort.getElement(), `beforeend`);
    this._sort.getElement().addEventListener(`change`, (evt) => this._onSortFormChange(evt));
  }

  _renderDays() {
    Object.keys(this._eventsByDate).forEach((it) => this._renderDay(it, this._eventsByDate[it]));
  }
  _onSortFormChange(evt) {
    evt.preventDefault();
    this._days.getElement().innerHTML = ``;

    switch (evt.target.value.split(`-`)[1]) {
      case `time`:
        this._renderDay(
            0,
            this._events.slice().sort((b, a) => (a.endTime - a.startTime) - (b.endTime - b.startTime))
        );
        break;
      case `price`:
        this._renderDay(
            0,
            this._events.slice().sort((a, b) => a.price - b.price)
        );
        break;
      case `event`:
        this._renderDays();
        break;
    }
  }
}

export {TripController};
