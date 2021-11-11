import { useEffect, useState, useCallback } from 'react';
import { useInterval } from '../../hooks/useInterval';
import { Button } from '../Button';
import { Timer } from '../Timer';
import { audioStartWorking, audioStopWorking } from '../../utils/handleSounds';
import { secondsToHours } from '../../utils/secondsToHours';

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
  const [cycles, setCycles] = useState(new Array(props.cycles - 1).fill(true));

  const [completedCycles, setCompletedCycles] = useState(0);
  const [completedWorkingTimes, setCompletedWorkingTimes] = useState(0);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (isWorking) setCompletedWorkingTimes(completedWorkingTimes + 1);
    },
    isCounting ? 1000 : null,
  );

  const startWork = useCallback(() => {
    setIsCounting(true);
    setIsWorking(true);
    setIsResting(false);
    setMainTime(props.defaultPomodoroTime);
    audioStartWorking.play();
  }, [
    setIsCounting,
    setIsWorking,
    setIsResting,
    setMainTime,
    props.defaultPomodoroTime,
  ]);
  const startRest = useCallback(
    (isLong: boolean) => {
      setIsCounting(true);
      setIsWorking(false);
      setIsResting(true);
      if (isLong) {
        setMainTime(props.longRestTime);
      } else {
        setMainTime(props.shortRestTime);
      }
      audioStopWorking.play();
    },
    [
      setIsCounting,
      setIsWorking,
      setIsResting,
      setMainTime,
      props.longRestTime,
      props.shortRestTime,
    ],
  );

  useEffect(() => {
    if (isWorking) document.body.classList.add('working');
    if (isResting) document.body.classList.remove('working');

    if (mainTime > 0) return;

    if (isWorking && cycles.length > 0) {
      startRest(false);
      cycles.pop();
    } else if (isWorking && cycles.length <= 0) {
      startRest(true);
      setCycles(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (isWorking) setCompletedPomodoros(completedPomodoros + 1);
    if (isResting) startWork();
  }, [
    isWorking,
    isResting,
    mainTime,
    startRest,
    startWork,
    cycles,
    completedPomodoros,
    completedCycles,
  ]);

  return (
    <div className="pomodoro">
      <h2>You are {isWorking ? 'working' : 'resting'}</h2>
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

      <div className="details">
        <p>Completed Cycles: {completedCycles}</p>
        <p>Working Hours: {secondsToHours(completedWorkingTimes)}</p>
        <p>Completed pomodoros: {completedPomodoros}</p>
      </div>
    </div>
  );
}
