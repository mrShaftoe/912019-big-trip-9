import {getRoute} from './components/route';

const renderComponent = function (container, content, position) {
  container.insertAdjacentHTML(position, content);
};

const routeContainer = document.querySelector(`.trip-info`);

renderComponent(routeContainer, getRoute(), `afterbegin`);
