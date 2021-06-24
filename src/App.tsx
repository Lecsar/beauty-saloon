import {useLoadData} from './hooks/useLoadData';
import {fakeApiGetSchedule} from './mockData';

const LAG_MS = 500;

const preparedFakeApiGetSchedule = () =>
  fakeApiGetSchedule(LAG_MS).then(({schedule, workingPlaces}) => ({
    schedule: schedule.sort((a, b) => a.index - b.index),
    workingPlaces,
  }));

export function App() {
  const {data, isLoading} = useLoadData(preparedFakeApiGetSchedule);

  console.log(data);
  console.log(isLoading);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return data ? <h1>123s</h1> : null;
}
