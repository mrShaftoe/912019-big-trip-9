import {getRoute} from './components/route';
import {getMenu} from './components/menu';
import {getFilters} from './components/filters';
import {getTripSorting} from "./components/tripsorting";
import {getEventsList} from './components/eventslist';
import {getEventEditing, getEvent} from './components/event';
import {getEventData} from './components/data';
import {groupEventsByDate} from './utils';

const EVENTS_QUANTITY = 4;
const renderComponent = function (container, content, position) {
  container.insertAdjacentHTML(position, content);
};

const events = Array.from({length: EVENTS_QUANTITY}, getEventData).sort((first, second) => first.startTime - second.startTime);
const eventsByDate = groupEventsByDate(events.slice(1));

const routeContainer = document.querySelector(`.trip-info`);
const [menuContainer, filtersContainer] = document.querySelectorAll(`.trip-controls h2`);
const tripEvents = document.querySelector(`.trip-events`);

renderComponent(routeContainer, getRoute(), `afterbegin`);
renderComponent(menuContainer, getMenu(), `afterend`);
renderComponent(filtersContainer, getFilters(), `afterend`);
renderComponent(tripEvents, getTripSorting(), `beforeend`);
renderComponent(tripEvents, getEventEditing(events[0]), `beforeend`);
renderComponent(tripEvents, getEventsList(), `beforeend`);

const eventsList = tripEvents.querySelector(`.trip-events__list`);
for (let i = 0; i < 3; i++) {
  renderComponent(eventsList, getEvent(), `beforeend`);
}
