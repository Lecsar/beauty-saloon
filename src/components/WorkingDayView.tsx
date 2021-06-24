import {observer} from 'mobx-react-lite';
import {Typography, Switch} from 'antd';

import {WorkingDay} from '../model';

import {WorkinPlaceView} from './WorkinPlaceView';
import {WORKING_PLACE_DICTIONARY} from '../NewApp';

interface IProps {
  workingDay: WorkingDay;
}

export const WorkingDayView = observer(
  ({
    workingDay: {
      name,
      isWorkingToday,
      workingPlacesInfo,
      hasBreak,
      breakHours,
      toggleHasBreak,
      toggleIsWorkingToday,
      addBreakInterval,
      editBreakInterval,
      removeBreakInterval,
    },
  }: IProps) => {
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
          <div>
            {Object.entries(workingPlacesInfo).map(([id, {isWorkingToday, toggleIsWorkingToday, ...rest}]) => (
              <WorkinPlaceView
                key={id}
                title={WORKING_PLACE_DICTIONARY[id].address}
                isActive={isWorkingToday}
                toggleIsActive={toggleIsWorkingToday}
                {...rest}
              />
            ))}

            <WorkinPlaceView
              title="Перерыв"
              isActive={hasBreak}
              workingHours={breakHours}
              addTimeInterval={addBreakInterval}
              editTimeInterval={editBreakInterval}
              removeTimeInterval={removeBreakInterval}
              toggleIsActive={toggleHasBreak}
            />
          </div>
        )}
      </div>
    );
  }
);
