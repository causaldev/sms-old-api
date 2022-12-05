import moment from 'moment';
const zemen = require('zemen');

export const betweenTime = (
  time: string,
  startTime: string,
  endTime: string
) => {
  const timeMoment = moment(time, 'hh:mm a');
  const startTimeMoment = moment(startTime, 'hh:mm a');
  const endTimeMoment = moment(endTime, 'hh:mm a');

  return (
    timeMoment.isSameOrAfter(startTimeMoment) &&
    timeMoment.isSameOrBefore(endTimeMoment)
  );
};

export const parseAttendanceDate = (dateTime: string) => {
  const split = dateTime.indexOf(' ');
  const americanDate = dateTime.substring(0, split);
  const [month, day, year] = americanDate.split('/');
  const time = dateTime.substring(split + 1);

  return {
    date: moment({
      year: parseInt(year, 10),
      month: parseInt(month, 10) - 1,
      day: parseInt(day, 10),
    }).format('YYYY-MM-DD'),
    time: moment(time, 'h:mm a').format('hh:mm a'),
  };
};

export const convertToEthiopian = (year, month, day) => {
  console.log(year, month, day);

  const {
    year: convertedYear,
    month: convertedMonth,
    date: convertedDay,
  } = zemen.toEC(year, month, day);
  // console.log(zemen.toEC(year, month, day));

  return [convertedYear, convertedMonth + 1, convertedDay];
};

export const convertToEthiopianRaw = (date: string) => {
  const [year, month, day] = date.split('-');
  // console.log(year, month, day);

  const {
    year: convertedYear,
    month: convertedMonth,
    date: convertedDay,
  } = zemen.toEC(
    parseInt(year, 10),
    parseInt(month, 10) - 1,
    parseInt(day, 10)
  );
  // console.log(zemen.toEC(year, month, day));

  return `${convertedDay}/${convertedMonth + 1}/${convertedYear}`;
};

export const convertToGregorian = (year, month, day) => {
  const parsed = moment(zemen.toGC(year, month, day));

  return [parsed.year(), parsed.month(), parsed.date()];
};

export const getEthiopianYear = () => {
  const z = new zemen();

  return z.year;
};

export const getDayDiff = (end: number[], start: number[]) =>
  (end[0] - start[0]) * 365 + (end[1] - start[1]) * 30 + (end[2] - start[2]);
