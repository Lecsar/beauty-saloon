import {observer} from 'mobx-react-lite';
import {WorkingDay, WorkingPlace} from './model';
import {IWorkingPlace} from './types';

import {WorkingDayView} from './components/WorkingDayView';

const nameOfWeekDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const Moscow: IWorkingPlace = {id: 1, address: 'В Москве'};
const Academ: IWorkingPlace = {id: 2, address: 'На Академической'};

export const WORKING_PLACE_DICTIONARY = {
  [Moscow.id]: Moscow,
  [Academ.id]: Academ,
};

const workingDays = nameOfWeekDays.map(
  (name, index) => new WorkingDay(name, index, {[Moscow.id]: new WorkingPlace(), [Academ.id]: new WorkingPlace()})
);

export const App = observer(() => {
  return (
    <div style={{width: '800px', padding: '20px'}}>
      {workingDays.map((workingDay, index) => (
        <WorkingDayView key={index} workingDay={workingDay} />
      ))}
    </div>
  );
});
