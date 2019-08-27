import {Route} from './components/route';
import {MenuItem} from './components/menu';
import {Filter} from './components/filters';
import {TripTabs} from './components/triptabs';
import {TripFilters} from './components/tripfilters';
import {getEventData, getRouteData, getMenuData, getFiltersData} from './components/data';
import {getTripCost, render} from './utils';
import {TripController} from './controllers/tripcontroller';

const EVENTS_QUANTITY = 10;

const events = Array.from({length: EVENTS_QUANTITY}, getEventData).sort((first, second) => first.startTime - second.startTime);

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

render(menuContainer, new TripTabs().getElement(), `afterend`);
getMenuData().forEach(renderMenuItem);
render(
    filtersContainer,
    new TripFilters().getElement(),
    `afterend`
);
getFiltersData().forEach(renderFilter);

if (events.length) {
  tripCostField.innerText = getTripCost(events);
  renderRoute(getRouteData(events));
}

const tripController = new TripController(tripEvents, events);
tripController.init();
