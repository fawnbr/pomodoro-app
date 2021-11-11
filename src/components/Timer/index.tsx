import { secondsToTime } from '../../utils/secondsToTime';

type TimerProps = {
  mainTime: number;
};

export function Timer(props: TimerProps): JSX.Element {
  return <div className="timer">{secondsToTime(props.mainTime)}</div>;
}
