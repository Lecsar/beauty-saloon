import {IWorkingPlace} from './types';

export const NAME_OF_WEEK_DAYS = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
export const MOSCOW: IWorkingPlace = {id: 1, address: 'В Москве'};
export const ACADEM: IWorkingPlace = {id: 2, address: 'На Академической'};

export const WORKING_PLACE_DICTIONARY = {
  [MOSCOW.id]: MOSCOW,
  [ACADEM.id]: ACADEM,
};
