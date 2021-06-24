import {IDay, IWorkingPlace} from './types';

const Moscow: IWorkingPlace = {
  id: 1,
  address: 'В Москве',
};

const Academ: IWorkingPlace = {
  id: 2,
  address: 'На Академической',
};

const WORKING_PLACES_MOCK = {
  [Moscow.id]: Moscow,
  [Academ.id]: Academ,
};

const SCHEDULE_MOCK: IDay[] = [
  {
    index: 0,
    name: 'Понедельник',
    isWorkingToday: false,
    hasBreak: false,
    breakHours: [],
    workingPlacesInfo: {
      [Moscow.id]: {
        isWorkingToday: false,
        workingHours: [],
      },
      [Academ.id]: {
        isWorkingToday: false,
        workingHours: [],
      },
    },
  },
  {
    index: 1,
    name: 'Вторник',
    isWorkingToday: false,
    hasBreak: false,
    breakHours: [],
    workingPlacesInfo: {
      [Moscow.id]: {
        isWorkingToday: false,
        workingHours: [],
      },
      [Academ.id]: {
        isWorkingToday: false,
        workingHours: [],
      },
    },
  },
  {
    index: 2,
    name: 'Среда',
    isWorkingToday: false,
    hasBreak: false,
    breakHours: [],
    workingPlacesInfo: {
      [Moscow.id]: {
        isWorkingToday: false,
        workingHours: [],
      },
      [Academ.id]: {
        isWorkingToday: false,
        workingHours: [],
      },
    },
  },
  {
    index: 3,
    name: 'Четверг',
    isWorkingToday: false,
    hasBreak: false,
    breakHours: [],
    workingPlacesInfo: {
      [Moscow.id]: {
        isWorkingToday: false,
        workingHours: [],
      },
      [Academ.id]: {
        isWorkingToday: false,
        workingHours: [],
      },
    },
  },
  {
    index: 4,
    name: 'Пятница',
    isWorkingToday: false,
    hasBreak: false,
    breakHours: [],
    workingPlacesInfo: {
      [Moscow.id]: {
        isWorkingToday: false,
        workingHours: [],
      },
      [Academ.id]: {
        isWorkingToday: false,
        workingHours: [],
      },
    },
  },
  {
    index: 5,
    name: 'Суббота',
    isWorkingToday: false,
    hasBreak: false,
    breakHours: [],
    workingPlacesInfo: {
      [Moscow.id]: {
        isWorkingToday: false,
        workingHours: [],
      },
      [Academ.id]: {
        isWorkingToday: false,
        workingHours: [],
      },
    },
  },
  {
    index: 6,
    name: 'Воскресенье',
    isWorkingToday: false,
    hasBreak: false,
    breakHours: [],
    workingPlacesInfo: {
      [Moscow.id]: {
        isWorkingToday: false,
        workingHours: [],
      },
      [Academ.id]: {
        isWorkingToday: false,
        workingHours: [],
      },
    },
  },
];

export const fakeApiGetSchedule = (
  lag = 500
): Promise<{schedule: IDay[]; workingPlaces: Record<IWorkingPlace['id'], IWorkingPlace>}> =>
  new Promise((res) =>
    setTimeout(() => {
      res({
        schedule: SCHEDULE_MOCK,
        workingPlaces: WORKING_PLACES_MOCK,
      });
    }, lag)
  );
