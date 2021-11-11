import { secondsToMinutes } from '../../utils/secondsToMinutes';

type TimerProps = {
  mainTime: number;
};

export function Timer(props: TimerProps): JSX.Element {
  return <div className="timer">{secondsToMinutes(props.mainTime)}</div>;
}
