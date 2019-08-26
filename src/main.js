import {Route} from './components/route';
import {MenuItem} from './components/menu';
import {Filter} from './components/filters';
import {Sorting} from "./components/tripsorting";
import {EventsDay} from './components/eventsday';
import {Event, EventEdit, FirstEvent} from './components/event';
import {TripTabs} from './components/triptabs';
import {TripDays} from './components/tripdays';
import {TripFilters} from './components/tripfilters';
import {getEventData, getRouteData, getMenuData, getFiltersData, getSortingItems} from './components/data';
import {groupEventsByDate, getTripCost, render} from './utils';

const EVENTS_QUANTITY = 10;

const events = Array.from({length: EVENTS_QUANTITY}, getEventData).sort((first, second) => first.startTime - second.startTime);
const eventsByDate = groupEventsByDate(events);

const routeContainer = document.querySelector(`.trip-info`);
const [menuContainer, filtersContainer] = document.querySelectorAll(`.trip-controls h2`);
const tripCostField = document.querySelector(`.trip-info__cost-value`);
const tripEvents = document.querySelector(`.trip-events`);

const renderRoute = function (routeMock) {
  const route = new Route(routeMock);
  render(routeContainer, route.getElement(), `afterbegin`);
};
const renderMenuItem = function (menuItemMock) {
  const menuItem = new MenuItem(menuItemMock);
  render(
      document.querySelector(`.trip-tabs`),
      menuItem.getElement(),
      `beforeend`
  );
};
const renderFilter = function (filterMock) {
  const filter = new Filter(filterMock);
  render(
      document.querySelector(`.trip-filters`),
      filter.getElement(),
      `beforeend`
  );
};

const renderSorting = function (sortingMockup) {
  const sorting = new Sorting(sortingMockup);
  render(tripEvents, sorting.getElement(), `beforeend`);
};

const renderEvent = function (eventMock, eventDayContainer) {
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
};

const renderFirstEvent = function () {
  const firstEvent = new FirstEvent();
  render(tripEvents, firstEvent.getElement(), `beforeend`);
};

const renderDay = function (dayMock, dayEvents) {
  const day = new EventsDay(dayMock);
  render(document.querySelector(`.trip-days`), day.getElement(), `beforeend`);
  dayEvents.forEach((it) => renderEvent(it, day.getElement().querySelector(`.trip-events__list`)), `beforeend`);
};

render(menuContainer, new TripTabs().getElement(), `afterend`);
getMenuData().forEach(renderMenuItem);
render(
    filtersContainer,
    new TripFilters().getElement(),
    `afterend`
);
getFiltersData().forEach(renderFilter);

if (!events.length) {
  renderFirstEvent();
} else {
  tripCostField.innerText = getTripCost(events);
  renderRoute(getRouteData(events));
  renderSorting(getSortingItems());

  render(tripEvents, new TripDays().getElement(), `beforeend`);
  Object.keys(eventsByDate).forEach((it) => renderDay(it, eventsByDate[it]));
}
