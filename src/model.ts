import {makeAutoObservable} from 'mobx';
import {IDay, IdType, ITimeInterval, IWorkingPlace, IWorkingPlaceInfo} from './types';

interface IEditTimeValue {
  // null если не хотим устанавливать, undefined сбрасывает
  from?: string | null;
  to?: string | null;
}

export class WorkingPlace implements IWorkingPlaceInfo {
  isWorkingToday = false;
  workingHours: ITimeInterval[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public toggleIsWorkingToday = () => {
    this.isWorkingToday = !this.isWorkingToday;
  };

  public addTimeInterval = () => {
    this.workingHours.push({from: undefined, to: undefined});
  };

  public removeTimeInterval = (intervalIndex: number) => {
    this.workingHours.splice(intervalIndex, 1);
  };

  public editTimeInterval = (intervalIndex: number, {from, to}: IEditTimeValue) => {
    if (from !== null) {
      this.workingHours[intervalIndex].from = from;
    }

    if (to !== null) {
      this.workingHours[intervalIndex].to = to;
    }
  };
}

export class WorkingDay implements IDay {
  name;
  index;
  workingPlacesInfo;
  breakHours = [];
  hasBreak = false;
  isWorkingToday = false;

  constructor(name: string, index: number, workingPlacesInfo: Record<IWorkingPlace['id'], WorkingPlace>) {
    makeAutoObservable(this);

    this.name = name;
    this.index = index;
    this.workingPlacesInfo = workingPlacesInfo;
  }

  public toggleIsWorkingToday = () => {
    console.log(this.isWorkingToday);
    this.isWorkingToday = !this.isWorkingToday;
  };

  public toggleHasBreak = () => {
    this.hasBreak = !this.hasBreak;
  };

  public toggleAvailabilityOfWorkingPlace = (workingPlaceId: IdType) => {
    this.workingPlacesInfo[workingPlaceId].toggleIsWorkingToday();
  };

  public addTimeIntervalToPlace = (workingPlaceId: IdType) => {
    this.workingPlacesInfo[workingPlaceId].addTimeInterval();
  };

  public removeTimeIntervalAtPlace = (workingPlaceId: IdType, intervalIndex: number) => {
    this.workingPlacesInfo[workingPlaceId].removeTimeInterval(intervalIndex);
  };

  public editTimeIntervalAtPlace = (workingPlaceId: IdType, intervalIndex: number, timeInterval: IEditTimeValue) => {
    this.workingPlacesInfo[workingPlaceId].editTimeInterval(intervalIndex, timeInterval);
  };
}

export class WorkingWeek {
  workingDays: WorkingDay[];

  constructor(workingDays: WorkingDay[]) {
    makeAutoObservable(this);

    this.workingDays = workingDays;
  }

  private getDay(dayIndex: number) {
    return this.workingDays[dayIndex];
  }

  public toggleIsWorkingToday = (dayIndex: number) => {
    this.getDay(dayIndex).toggleIsWorkingToday();
  };

  public toggleHasBreak = (dayIndex: number) => {
    this.getDay(dayIndex).toggleHasBreak();
  };

  public toggleDayAvailabilityOfWorkingPlace = (dayIndex: number, workingPlaceId: IdType) => {
    this.getDay(dayIndex).toggleAvailabilityOfWorkingPlace(workingPlaceId);
  };

  public addTimeIntervalToPlace = (dayIndex: number, workingPlaceId: IdType) => {
    this.getDay(dayIndex).addTimeIntervalToPlace(workingPlaceId);
  };

  public removeTimeIntervalAtPlace = (dayIndex: number, workingPlaceId: IdType, intervalIndex: number) => {
    this.getDay(dayIndex).removeTimeIntervalAtPlace(workingPlaceId, intervalIndex);
  };

  public editTimeIntervalAtPlace = (
    dayIndex: number,
    workingPlaceId: IdType,
    intervalIndex: number,
    timeInterval: IEditTimeValue
  ) => {
    this.getDay(dayIndex).editTimeIntervalAtPlace(workingPlaceId, intervalIndex, timeInterval);
  };
}
