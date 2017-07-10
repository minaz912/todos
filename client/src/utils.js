import moment from 'moment';

const PRIORITY_LEVELS = {
  'URGENT': 1,
  'IMPORTANT': 2,
  'NORMAL': 3
};

export const sortByPriority = (data) => {
  return data.sort((a, b) => PRIORITY_LEVELS[a.priority] > PRIORITY_LEVELS[b.priority])
}


export const sortByCompDate = (data) => {
  return data.sort((a, b) => moment.utc(a.completionDate).diff(moment.utc(b.completionDate)));
}


export const itemIsDue = (dueDate) => {
  return moment().diff(dueDate, 'days') > 0;
}
