import {AbstractComponent} from './abstract-component';

class TripTabs extends AbstractComponent {

  getTemplate() {
    return `
      <nav class="trip-controls__trip-tabs  trip-tabs"></nav>
    `.trim();
  }
}

export {TripTabs};
