const getRoute = function ({start, end, points}) {

  return `
  <div class="trip-info__main">
    <h1 class="trip-info__title">
      ${points.join(` &mdash; `)}
    </h1>
    <p class="trip-info__dates">
    ${start.month} ${start.day}&nbsp;&mdash;&nbsp;${end.month === start.month ? `` : end.month} ${end.day}
    </p>
  </div>
  `;
};

export {getRoute};
