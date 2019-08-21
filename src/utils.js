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

const groupEventsByDate = function (events) {
  return events.reduce((acc, it) => {
    const date = getFormatedDate(it.startTime);
    if (!(date in acc)) {
      acc[date] = [];
    }
    acc[date].push(it);
    return acc;
  }, {});
};

const capitalize = function (string) {
  return `${string[0].toUpperCase()}${string.slice(1)}`;
};

export {getRandomInt, getRandomFromArray, getShuffledArray, getFormatedDate, groupEventsByDate, capitalize, getFormatedDateTime};
