import {observer} from 'mobx-react-lite';
import {Typography, Switch} from 'antd';

import {WorkingDay} from '../model';
import {WORKING_PLACE_DICTIONARY} from '../const';

import {WorkinPlaceView} from './WorkinPlaceView';

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
      removeBreakInterval,
      editBreakIntervalFrom,
      editBreakIntervalTo,
    },
  }: IProps) => {
    return (
      <div className="workingDay">
        <div className="workingDayHeader">
          <Typography.Title level={2}>{name}</Typography.Title>
          <Switch checked={isWorkingToday} onChange={toggleIsWorkingToday} />
        </div>

        {isWorkingToday && (
          <div>
            {Object.entries(workingPlacesInfo).map(
              ([id, {isWorkingToday, toggleIsWorkingToday, editTimeIntervalFrom, editTimeIntervalTo, ...rest}]) => (
                <WorkinPlaceView
                  key={id}
                  title={WORKING_PLACE_DICTIONARY[id].address}
                  isActive={isWorkingToday}
                  toggleIsActive={toggleIsWorkingToday}
                  editTimeIntervalFrom={editTimeIntervalFrom}
                  editTimeIntervalTo={editTimeIntervalTo}
                  {...rest}
                />
              )
            )}

            <WorkinPlaceView
              title="Перерыв"
              isActive={hasBreak}
              workingHours={breakHours}
              addTimeInterval={addBreakInterval}
              editTimeIntervalFrom={editBreakIntervalFrom}
              editTimeIntervalTo={editBreakIntervalTo}
              removeTimeInterval={removeBreakInterval}
              toggleIsActive={toggleHasBreak}
            />
          </div>
        )}
      </div>
    );
  }
);
