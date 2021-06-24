import {makeAutoObservable} from 'mobx';
import {IDay, ITimeInterval, IWorkingPlace, IWorkingPlaceInfo} from './types';

interface IEditTimeValue {
  // null если не хотим устанавливать, undefined сбрасывает
  from?: string | null;
  to?: string | null;
}

export class WorkingPlace implements IWorkingPlaceInfo {
  isWorkingToday = false;
  workingHours: ITimeInterval[] = [{from: undefined, to: undefined}];

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
  breakHours: ITimeInterval[] = [{from: undefined, to: undefined}];
  hasBreak = false;
  isWorkingToday = false;

  constructor(name: string, index: number, workingPlacesInfo: Record<IWorkingPlace['id'], WorkingPlace>) {
    makeAutoObservable(this);

    this.name = name;
    this.index = index;
    this.workingPlacesInfo = workingPlacesInfo;
  }

  public toggleIsWorkingToday = () => {
    this.isWorkingToday = !this.isWorkingToday;
  };

  public toggleHasBreak = () => {
    this.hasBreak = !this.hasBreak;
  };

  public addBreakInterval = () => {
    this.breakHours.push({from: undefined, to: undefined});
  };

  public removeBreakInterval = (intervalIndex: number) => {
    this.breakHours.splice(intervalIndex, 1);
  };

  public editBreakInterval = (intervalIndex: number, {from, to}: IEditTimeValue) => {
    if (from !== null) {
      this.breakHours[intervalIndex].from = from;
    }

    if (to !== null) {
      this.breakHours[intervalIndex].to = to;
    }
  };
}
