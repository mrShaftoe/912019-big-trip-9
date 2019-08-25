import {getRandomFromArray, getRandomInt, getShuffledArrayOfObjects, getFormatedDate} from '../utils';

const MS_IN_HOUR = 60 * 60 * 1000;
const MS_IN_DAY = 24 * MS_IN_HOUR;
const EVENT_TYPES = [
  {
    name: `bus`,
    output: `to`,
  },
  {
    name: `check-in`,
    output: `in`,
  },
  {
    name: `drive`,
    output: `to`,
  },
  {
    name: `flight`,
    output: `to`,
  },
  {
    name: `restaurant`,
    output: `in`,
  },
  {
    name: `ship`,
    output: `to`,
  },
  {
    name: `sightseeing`,
    output: `in`,
  },
  {
    name: `taxi`,
    output: `to`,
  },
  {
    name: `train`,
    output: `to`,
  },
  {
    name: `transport`,
    output: `to`,
  },
];

const CITIES = [`Copenhagen`, `Helsinki`, `Prague`, `Stockholm`];
const DESCRIPTIONS = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`.split(`. `);
const OFFERS = [
  {
    name: `luggage`,
    caption: `Add luggage`,
    price: 10,
    checked: Boolean(Math.round(Math.random())),
  },
  {
    name: `class`,
    caption: `Switch to comfort class`,
    price: 150,
    checked: Boolean(Math.round(Math.random())),
  },
  {
    name: `meal`,
    caption: `Add meal`,
    price: 2,
    checked: Boolean(Math.round(Math.random())),
  },
  {
    name: `seats`,
    caption: `Choose seats`,
    price: 9,
    checked: Boolean(Math.round(Math.random())),
  }
];

const getSortingItems = function () {
  return [{
    name: `event`,
    isChecked: true,
  },
  {
    name: `time`,
    isChecked: false,
  },
  {
    name: `price`,
    isChecked: false,
  }];
};

const getEventData = function () {
  const startTime = Date.now() + 1 + getRandomInt(8 * MS_IN_DAY, -7 * MS_IN_DAY);
  return {
    type: getRandomFromArray(EVENT_TYPES),
    destination: getRandomFromArray(CITIES),
    startTime,
    endTime: startTime + getRandomInt((2 * MS_IN_HOUR)),
    price: getRandomInt(101, 10),
    description: Array.from({length: getRandomInt(4)}, () => getRandomFromArray(DESCRIPTIONS)).join(`. `),
    photos: Array.from({length: getRandomInt(5)}, () => `http://picsum.photos/300/150?r=${Math.random()}`),
    offers: getShuffledArrayOfObjects(OFFERS).slice(0, getRandomInt(3)),
  };
};

const getRouteData = function (events) {
  const startDate = events[0].startTime;
  const endDate = events[events.length - 1].endTime;
  const destinations = events.reduce((acc, {destination}) => {
    if (acc[acc.length - 1] !== destination) {
      acc.push(destination);
    }
    return acc;
  }, []);

  return {
    start: {
      month: getFormatedDate(startDate, {month: `short`}),
      day: getFormatedDate(startDate, {day: `2-digit`}),
    },
    end: {
      month: getFormatedDate(endDate, {month: `short`}),
      day: getFormatedDate(endDate, {day: `2-digit`}),
    },
    points: destinations.length > 3 ? [destinations[0], `...`, destinations[destinations.length - 1]] : destinations,
  };
};

const getMenuData = function () {
  return [
    {
      name: `table`,
      isActive: true
    },
    {
      name: `stats`,
      isActive: false
    }
  ];
};

const getFiltersData = function () {
  return [
    {
      name: `everything`,
      isChecked: true,
    },
    {
      name: `future`,
      isChecked: false,
    },
    {
      name: `past`,
      isChecked: false,
    }
  ];
};

export {getEventData, getRouteData, getMenuData, getFiltersData, getSortingItems};
