import {observer} from 'mobx-react-lite';
import {Typography, Switch} from 'antd';
import {TimeSelect} from './TimeSelect';

import {WorkingPlace} from '../model';

interface IProps {
  title: string;
  workingPlace: WorkingPlace;
}

export const WorkinPlaceView = observer(
  ({title, workingPlace: {isWorkingToday, workingHours, toggleIsWorkingToday, editTimeInterval}}: IProps) => {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '80px 1fr',
          gridColumnGap: '10px',
        }}
      >
        <div>
          <Switch checked={isWorkingToday} onChange={toggleIsWorkingToday} />
          <Typography.Title level={4}>{title}</Typography.Title>
        </div>

        <div>
          {workingHours.map(({from, to}, index) => (
            <div key={`${from}-${to}`}>
              <Typography.Title level={4}>c</Typography.Title>
              <TimeSelect time={from!} onChange={(from) => editTimeInterval(index, {from, to: null})} />

              <Typography.Title level={4}>до</Typography.Title>
              <TimeSelect time={to!} onChange={(to) => editTimeInterval(index, {from: null, to})} />
            </div>
          ))}
        </div>
      </div>
    );
  }
);
