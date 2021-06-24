import produce from 'immer';
import {WritableDraft} from 'immer/dist/internal';
import {IDay, IdType} from './types';

type TAction =
  | {
      type: 'TOGGLE_IS_WORKING_DAY';
      payload: number;
    }
  | {
      type: 'TOGGLE_IS_WORKING_PLACE';
      payload: {
        dayIndex: number;
        placeId: IdType;
      };
    }
  | {
      type: 'TOGGLE_HAS_BREAK';
      payload: number;
    }
  | {
      type: 'ADD_TIME_INTERVAL_TO_PLACE';
      payload: {
        dayIndex: number;
        placeId: IdType;
      };
    }
  | {
      type: 'EDIT_PLACE_TIME_INTERVAL';
      payload: {
        dayIndex: number;
        placeId: IdType;
        intervalIndex: number;
        // если null, то хотим сбросить значение
        from?: string | null;
        to?: string | null;
      };
    }
  | {
      type: 'REMOVE_PLACE_TIME_INTERVAL';
      payload: {
        dayIndex: number;
        placeId: IdType;
        intervalIndex: number;
      };
    };

const getWorkingPlace = (draft: WritableDraft<IDay>[], dayIndex: number, placeId: IdType) =>
  draft[dayIndex].workingPlacesInfo[placeId];

export const reducer = (state: IDay[], action: TAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case 'TOGGLE_IS_WORKING_DAY': {
        const dayIndex = action.payload;

        draft[dayIndex].isWorkingToday = !draft[dayIndex].isWorkingToday;
        break;
      }

      case 'TOGGLE_IS_WORKING_PLACE': {
        const {dayIndex, placeId} = action.payload;
        const workingPlace = getWorkingPlace(draft, dayIndex, placeId);

        workingPlace.isWorkingToday = !workingPlace.isWorkingToday;
        break;
      }

      case 'TOGGLE_HAS_BREAK': {
        const dayIndex = action.payload;

        draft[dayIndex].hasBreak = !draft[dayIndex].hasBreak;
        break;
      }

      case 'ADD_TIME_INTERVAL_TO_PLACE': {
        const {dayIndex, placeId} = action.payload;
        const workingPlace = getWorkingPlace(draft, dayIndex, placeId);

        workingPlace.workingHours.push({});
        break;
      }

      case 'EDIT_PLACE_TIME_INTERVAL': {
        const {dayIndex, placeId, intervalIndex, from, to} = action.payload;
        const workingPlace = getWorkingPlace(draft, dayIndex, placeId);
        const timeInterval = workingPlace.workingHours[intervalIndex];

        if (from !== null) {
          timeInterval.from = from;
        }

        if (to !== null) {
          timeInterval.to = to;
        }
        break;
      }

      case 'REMOVE_PLACE_TIME_INTERVAL': {
        const {dayIndex, placeId, intervalIndex} = action.payload;
        const workingPlace = getWorkingPlace(draft, dayIndex, placeId);

        delete workingPlace.workingHours[intervalIndex];
        break;
      }

      default:
        return;
    }
  });
