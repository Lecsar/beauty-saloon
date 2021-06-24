import {observer} from 'mobx-react-lite';
import {Select} from 'antd';

const timeOptions: string[] = [];

for (let i = 1; i <= 23; i++) {
  for (let j = 0; j <= 1; j++) {
    timeOptions.push(j === 0 ? `${i}:00` : `${i}:30`);
  }
}

interface IProps {
  time: string;
  onChange: (time: string) => void;
}

export const TimeSelect = observer(({time, onChange}: IProps) => (
  <Select value={time} onChange={onChange}>
    {timeOptions.map((time) => (
      <Select.Option key={time} value={time}>
        {time}
      </Select.Option>
    ))}
  </Select>
));
