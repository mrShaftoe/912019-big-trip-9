import {getRoute} from './components/route';
import {getMenu} from './components/menu';
import {getFilters} from './components/filters';

const renderComponent = function (container, content, position) {
  container.insertAdjacentHTML(position, content);
};

const routeContainer = document.querySelector(`.trip-info`);
const [menuContainer, filtersContainer] = document.querySelectorAll(`.trip-controls h2`);

renderComponent(routeContainer, getRoute(), `afterbegin`);
renderComponent(menuContainer, getMenu(), `afterend`);
renderComponent(filtersContainer, getFilters(), `afterend`);
