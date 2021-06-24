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
  editTimeInterval: (
    intervalIndex: number,
    value: {
      // null если не хотим устанавливать, undefined сбрасывает
      from?: string | null;
      to?: string | null;
    }
  ) => void;
  removeTimeInterval: (index: number) => void;
}

export const WorkinPlaceView = observer(
  ({title, isActive, workingHours, toggleIsActive, editTimeInterval, addTimeInterval, removeTimeInterval}: IProps) => {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 3fr',
          gridColumnGap: '10px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '40px 1fr',
            gridColumnGap: '20px',
          }}
        >
          <Switch checked={isActive} onChange={toggleIsActive} />
          <Typography.Title level={4}>{title}</Typography.Title>
        </div>

        <div>
          {workingHours.map(({from, to}, index) => (
            <div
              key={`${from}-${to}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '10px 1fr 30px 1fr 30px 30px',
                gridColumnGap: '10px',
              }}
            >
              <Typography.Title level={4}>c</Typography.Title>
              <TimeSelect time={from!} onChange={(from) => editTimeInterval(index, {from, to: null})} />

              <Typography.Title level={4}>до</Typography.Title>
              <TimeSelect time={to!} onChange={(to) => editTimeInterval(index, {from: null, to})} />

              <Button type="primary" onClick={addTimeInterval}>
                +
              </Button>

              {workingHours.length > 1 && (
                <Button type="primary" onClick={() => removeTimeInterval(index)}>
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
