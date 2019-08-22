import {capitalize, getFormatedDateTime, getFormatedTime, getDatetimeTime, getEventDuration} from '../utils';
const TRANSFER_GROUP = [`bus`, `drive`, `flight`, `ship`, `taxi`, `train`, `transport`];
const ACTIVITY_GROUP = [`check-in`, `restaurant`, `sightseeing`];
const DESTINATIONS = [`Copenhagen`, `Helsinki`, `Prague`, `Stockholm`];
const TimeTypes = {
  start: `from`,
  end: `to`
};

const getEventTypeItem = function (typeName, type) {
  return `
    <div class="event__type-item">
      <input id="event-type-${typeName}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeName}" ${type.name === typeName ? `checked` : ``}>
      <label class="event__type-label  event__type-label--${typeName}" for="event-type-${typeName}-1">${capitalize(typeName)}</label>
    </div>
  `;
};

const getEventTypeGroup = function (name, typesList, type) {
  return `
    <fieldset class="event__type-group">
      <legend class="visually-hidden">${name}</legend>
      ${typesList.map((it) => getEventTypeItem(it, type)).join(``)}
    </fieldset>
  `;
};

const getDestination = function (destination) {
  return `<option value="${destination}"></option>`;
};

const getTime = function (time, type) {
  return `
    <label class="visually-hidden" for="event-${type}-time-1">
      ${TimeTypes[type].toUpperCase()}
    </label>
    <input class="event__input  event__input--time" id="event-${type}-time-1" type="text" name="event-${type}-time" value="${getFormatedDateTime(time)}">
  `;
};

const getOffer = function ({name, caption, price, checked}) {
  return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${name}-1" type="checkbox" name="event-offer-${name}" ${checked ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${name}-1">
        <span class="event__offer-title">${caption}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>
  `;
};

const getSelectedOffer = function ({caption, price}) {
  return `
    <li class="event__offer">
      <span class="event__offer-title">${caption}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>
  `;
};

const getPhoto = function (photoSrc) {
  return `<img class="event__photo" src="${photoSrc}" alt="Event photo">`;
};

const getEventEditing = function ({type, destination, startTime, endTime, price, offers, description, photos}) {
  return `
      <form class="event trip-events__item event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.name}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              ${getEventTypeGroup(`Transfer`, TRANSFER_GROUP, type)}
              ${getEventTypeGroup(`Activity`, ACTIVITY_GROUP, type)}
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${capitalize(type.name)} ${type.output}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${DESTINATIONS.map(getDestination).join(``)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            ${getTime(startTime, `start`)}
            &mdash;
            ${getTime(endTime, `end`)}
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">

          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${offers.map(getOffer).join(``)}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${photos.map(getPhoto).join(``)}
              </div>
            </div>
          </section>
        </section>
      </form>
  `;
};

const getEvent = function ({type: {name, output}, destination, startTime, endTime, price, offers}) {
  return `
    <li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${name}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${capitalize(name)} ${output} ${destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${getDatetimeTime(startTime)}">${getFormatedTime(startTime)}</time>
            &mdash;
            <time class="event__end-time" datetime="${getDatetimeTime(endTime)}">${getFormatedTime(endTime)}</time>
          </p>
          <p class="event__duration">${getEventDuration(startTime, endTime)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offers.filter(({checked}) => checked).map(getSelectedOffer).join(``)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
};

export {getEventEditing, getEvent};

