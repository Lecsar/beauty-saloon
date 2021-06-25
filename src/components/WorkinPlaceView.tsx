import {observer} from 'mobx-react-lite';
import {Typography, Switch, Button} from 'antd';

import {TimeSelect} from './TimeSelect';
import {ITimeInterval} from '../types';

interface IProps {
  title: string;
  isActive: boolean;
  workingHours: ITimeInterval[];
  toggleIsActive: () => void;
  addTimeInterval: () => void;
  editTimeIntervalFrom: (intervalIndex: number, from?: string) => void;
  editTimeIntervalTo: (intervalIndex: number, to?: string) => void;
  removeTimeInterval: (index: number) => void;
}

export const WorkinPlaceView = observer(
  ({
    title,
    isActive,
    workingHours,
    toggleIsActive,
    editTimeIntervalFrom,
    editTimeIntervalTo,
    addTimeInterval,
    removeTimeInterval,
  }: IProps) => {
    return (
      <div className="workingPlace">
        <div className="workingPlaceLeftCol">
          <Switch checked={isActive} onChange={toggleIsActive} />
          <Typography.Title level={4}>{title}</Typography.Title>
        </div>

        <div>
          {workingHours.map(({from, to}, index) => (
            <div key={`${from}-${to}-${index}`} className="workingPlaceRightCol">
              <Typography.Title level={4}>c</Typography.Title>
              <TimeSelect disabled={!isActive} time={from} onChange={(from) => editTimeIntervalFrom(index, from)} />

              <Typography.Title level={4}>до</Typography.Title>
              <TimeSelect disabled={!isActive} time={to} onChange={(to) => editTimeIntervalTo(index, to)} />

              <Button type="primary" disabled={!isActive} onClick={addTimeInterval}>
                +
              </Button>

              {workingHours.length > 1 && (
                <Button type="primary" disabled={!isActive} onClick={() => removeTimeInterval(index)}>
                  -
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
);
