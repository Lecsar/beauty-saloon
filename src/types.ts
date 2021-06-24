export type IdType = string | number;

/** Часы работы */
export interface ITimeInterval {
  /** Со скольки */
  from?: string;
  /** До скольки */
  to?: string;
}

/** Точка работы салона */
export interface IWorkingPlace {
  /** ID точки работы салона */
  id: IdType;
  /** Адресс точки */
  address: string;
}

/** Информация по работе точек салона  */
export interface IWorkingPlaceInfo {
  /** Работает/не работает сегодня */
  isWorkingToday: boolean;
  /** Рабочие часы */
  workingHours: ITimeInterval[];
}

/** Информация по дню */
export interface IDay {
  /** Индекс дня недели */
  index: number;
  /** Название дня недели */
  name: string;
  /** Работает/не работает сегодня */
  isWorkingToday: boolean;
  /** Информация по работе точек салона */
  workingPlacesInfo: Record<IWorkingPlace['id'], IWorkingPlaceInfo>;
  /** Есть/нет перерыв */
  hasBreak: boolean;
  /** Часы перерыва */
  breakHours: ITimeInterval[];
}
