const getRandomInt = function (max, min = 0) {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomFromArray = function (arr) {
  return arr[getRandomInt(arr.length)];
};

const getShuffledArray = function (arr) {
  const shuffled = arr.slice();
  for (let i = shuffled.length - 1; i > 1; i--) {
    const j = getRandomInt(i + 1);
    [shuffled[j], shuffled[i]] = [shuffled[i], shuffled[j]];
  }
  return (shuffled);
};

const getFormatedDate = function (date, options = {month: `short`, day: `numeric`, year: `2-digit`}) {
  return new Intl.DateTimeFormat(`en-GB`, options).format(date).toUpperCase();
};

const getFormatedTime = function (date) {
  return new Intl.DateTimeFormat(`en-GB`, {hour: `2-digit`, minute: `2-digit`}).format(date);
};

const getFormatedDateTime = function (date) {
  return `${getFormatedDate(date, {month: `2-digit`, day: `numeric`, year: `2-digit`})} ${getFormatedTime(date)}`;
};

const getDatetimeTime = function (time) {
  const newDate = new Date(time);
  return `${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDate()}T${newDate.getHours()}:${newDate.getMinutes()}`;
};

const getOnlyDate = function (date) {
  const newDate = new Date(date);
  return new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()).valueOf();
};

const getEventDuration = function (startTime, endTime) {
  const minutes = Math.round((endTime - startTime) / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  return `${hours}H  ${minutes - hours * 60}M`;
};

const groupEventsByDate = function (events) {
  return events.reduce((acc, it) => {
    const date = getOnlyDate(it.startTime);
    if (!(date in acc)) {
      acc[date] = [];
    }
    acc[date].push(it);
    return acc;
  }, {});
};

const getTripCost = function (events) {
  return events.reduce((acc, it) => {
    const offersCost = it.offers.reduce((cost, offer) => offer.checked ? cost + offer.price : cost, 0);
    return acc + it.price + offersCost;
  }, 0);
};

const capitalize = function (string) {
  return `${string[0].toUpperCase()}${string.slice(1)}`;
};

export {
  getRandomInt,
  getRandomFromArray,
  getShuffledArray,
  getFormatedTime,
  getFormatedDate,
  groupEventsByDate,
  capitalize,
  getFormatedDateTime,
  getDatetimeTime,
  getEventDuration,
  getTripCost
};
