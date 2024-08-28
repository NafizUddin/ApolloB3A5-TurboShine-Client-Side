import { useEffect } from "react";
import { useTimer } from "react-timer-hook";

interface TimerProps {
  expiryTimestamp: Date;
}

const Timer = ({ expiryTimestamp }: TimerProps) => {
  const { seconds, minutes, hours, days, isRunning, start } = useTimer({
    expiryTimestamp,
    onExpire: () => console.log("Timer expired"),
  });

  useEffect(() => {
    // Start the timer if it's not already running
    if (!isRunning) start();
  }, [isRunning, start]);

  return (
    <p className="text-gray-900 font-bold">
      Starts In:{" "}
      {isRunning ? (
        <span>
          {days}d {hours}h {minutes}m {seconds}s
        </span>
      ) : (
        <span>Time's up!</span>
      )}
    </p>
  );
};

export default Timer;
