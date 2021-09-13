export const secondsDisplayAsMinutes = (seconds) =>
  seconds <= 60 ? seconds : Math.floor(seconds / 60);
