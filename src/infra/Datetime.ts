import moment from 'moment';
import {IDateFormatProps} from '@blueprintjs/datetime';

export function getMomentFormatter(format: string): IDateFormatProps {
  return {
    formatDate: (date: moment.MomentInput) => moment(date).format(format),
    parseDate: (str: moment.MomentInput) => moment(str, format).toDate(),
    placeholder: `Date`,
  };
}
export const regexDate = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
export const getYears: (fromDate: Date, toDate: Date) => Array<number> = (fromDate, toDate) => {
  let startYear = fromDate.getFullYear();
  const yearsBetween = [];

  for (let i = startYear; i <= toDate.getFullYear(); i++) {
    yearsBetween.push(startYear);
    startYear++;
  }

  return yearsBetween;
};
export const getCurrentYear: (date: Date) => number = (date) => date.getFullYear();
