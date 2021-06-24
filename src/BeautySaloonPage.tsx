import {useReducer, ReducerAction} from 'react';
import { reducer } from './reducer';

import {IDay, IdType, IWorkingPlace} from './types';

interface IProps {
  initialSchedule: IDay[];
  workingPlaces: Record<IdType, IWorkingPlace>;
}



export const BeautySaloonPage = ({initialSchedule, workingPlaces}: IProps) => {
  const [state, dispatch] = useReducer(reducer, initialSchedule);

//   dispatch({type: 'TOGGLE_IS_WORKING_DAY'})
};
