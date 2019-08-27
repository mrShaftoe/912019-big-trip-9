import {AbstractComponent} from './abstract-component';

class TripFilters extends AbstractComponent {
  getTemplate() {
    return `
    <form class="trip-filters" action="#" method="get"><button class="visually-hidden" type="submit">Accept filter</button></form>
    `.trim();
  }
}

export {TripFilters};
