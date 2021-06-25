import {Button} from 'antd';

import {WorkingDay, WorkingPlace} from './model';

import {WorkingDayView} from './components/WorkingDayView';
import {ACADEM, MOSCOW, NAME_OF_WEEK_DAYS} from './const';

const workingDays = NAME_OF_WEEK_DAYS.map(
  (name, index) => new WorkingDay(name, index, {[MOSCOW.id]: new WorkingPlace(), [ACADEM.id]: new WorkingPlace()})
);

export const App = () => {
  return (
    <div className="app">
      {workingDays.map((workingDay, index) => (
        <WorkingDayView key={index} workingDay={workingDay} />
      ))}

      <Button
        className="saveButton"
        type="primary"
        onClick={() => {
          console.log(JSON.parse(JSON.stringify(workingDays)));
        }}
      >
        Сохранить
      </Button>
    </div>
  );
};
