import {observer} from 'mobx-react-lite';
import {Typography, Switch} from 'antd';

import {WorkingDay} from '../model';

import {WorkinPlaceView} from './WorkinPlaceView';
import {WORKING_PLACE_DICTIONARY} from '../NewApp';

interface IProps {
  workingDay: WorkingDay;
}

export const WorkingDayView = observer(
  ({workingDay: {name, isWorkingToday, workingPlacesInfo, toggleIsWorkingToday}}: IProps) => {
    return (
      <div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 70px',
            gridColumnGap: '10px',
          }}
        >
          <Typography.Title level={2}>{name}</Typography.Title>
          <Switch checked={isWorkingToday} onChange={toggleIsWorkingToday} />
        </div>

        {isWorkingToday && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gridColumnGap: '10px',
              gridRowGap: '10px',
            }}
          >
            {Object.entries(workingPlacesInfo).map(([id, workingPlace]) => (
              <WorkinPlaceView key={id} title={WORKING_PLACE_DICTIONARY[id].address} workingPlace={workingPlace} />
            ))}
          </div>
        )}
      </div>
    );
  }
);
