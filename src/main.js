import {getRoute} from './components/route';
import {getMenu} from './components/menu';
import {getFilters} from './components/filters';
import {getTripSorting} from "./components/tripsorting";
import {getEventsList} from './components/eventslist';
import {getEventEditing} from './components/event';
import {getEventData, getRouteData, getMenuData, getFiltersData} from './components/data';
import {groupEventsByDate, getTripCost} from './utils';

const EVENTS_QUANTITY = 4;
const renderComponent = function (container, content, position) {
  container.insertAdjacentHTML(position, content);
};

const events = Array.from({length: EVENTS_QUANTITY}, getEventData).sort((first, second) => first.startTime - second.startTime);
const eventsByDate = groupEventsByDate(events.slice(1));

const routeContainer = document.querySelector(`.trip-info`);
const [menuContainer, filtersContainer] = document.querySelectorAll(`.trip-controls h2`);
const tripCostField = document.querySelector(`.trip-info__cost-value`);
const tripEvents = document.querySelector(`.trip-events`);

tripCostField.innerText = getTripCost(events);
renderComponent(routeContainer, getRoute(getRouteData(events)), `afterbegin`);
renderComponent(menuContainer, getMenu(getMenuData()), `afterend`);
renderComponent(filtersContainer, getFilters(getFiltersData()), `afterend`);
renderComponent(tripEvents, getTripSorting(), `beforeend`);
renderComponent(tripEvents, getEventEditing(events[0]), `beforeend`);
renderComponent(tripEvents, getEventsList(eventsByDate), `beforeend`);
