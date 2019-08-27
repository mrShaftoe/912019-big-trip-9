import {AbstractComponent} from './abstract-component';

class TripDays extends AbstractComponent {
  getTemplate() {
    return `
      <ul class="trip-days"></ul>
    `.trim();
  }
}

export {TripDays};
