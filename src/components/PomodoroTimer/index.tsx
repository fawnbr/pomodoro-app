import { useEffect, useState } from 'react';
import { useInterval } from '../../hooks/useInterval';
import { Button } from '../Button';
import { Timer } from '../Timer';
import { audioStartWorking, audioStopWorking } from '../../utils/handleSounds';

type PomodoroTimerProps = {
  defaultPomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
};

export function PomodoroTimer(props: PomodoroTimerProps): JSX.Element {
  const [mainTime, setMainTime] = useState(props.defaultPomodoroTime);
  const [isCounting, setIsCounting] = useState(false);
  const [isWorking, setIsWorking] = useState(false);
  const [isResting, setIsResting] = useState(false);

  useEffect(() => {
    if (isWorking) document.body.classList.add('working');
    if (isResting) document.body.classList.remove('working');
  }, [isWorking]);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    isCounting ? 1000 : null,
  );

  const startWork = () => {
    setIsCounting(true);
    setIsWorking(true);
    setIsResting(false);
    setMainTime(props.defaultPomodoroTime);
    audioStartWorking.play();
  };
  const startRest = (isLong: boolean) => {
    setIsCounting(true);
    setIsWorking(false);
    setIsResting(true);
    if (isLong) {
      setMainTime(props.longRestTime);
    } else {
      setMainTime(props.shortRestTime);
    }
    audioStopWorking.play();
  };

  return (
    <div className="pomodoro">
      <h2>You are: working</h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button text="Work" onClick={() => startWork()} />
        <Button
          className={!isWorking && !isResting ? 'hidden' : ''}
          text={isCounting ? 'Pause' : 'Resume'}
          onClick={() => setIsCounting(!isCounting)}
        />
        <Button text="Rest" onClick={() => startRest(false)} />
      </div>
    </div>
  );
}
