import { useEffect } from "react";
import { useTimer } from "react-timer-hook";

const NavTimer = ({ expiryTimestamp, immediateBooking }: any) => {
  const { seconds, minutes, hours, days, isRunning, start } = useTimer({
    expiryTimestamp,
    onExpire: () => console.log("Timer expired"),
  });

  useEffect(() => {
    // Start the timer if it's not already running
    if (!isRunning) start();
  }, [isRunning, start]);

  const formatTime = (time: number) => {
    return time.toString().padStart(2, "0");
  };

  return (
    <div className="pt-4">
      <h1 className="text-center lg:text-left font-bold">
        {immediateBooking?.service?.name} in:
      </h1>
      <div className="timer-container">
        <div className="timer-grid2">
          <div className="time-unit">
            <span className="digit">{formatTime(days)}</span>
            <span className="label">DAYS</span>
          </div>
          <div className="time-unit">
            <span className="digit">{formatTime(hours)}</span>
            <span className="label">HOURS</span>
          </div>
          <div className="time-unit">
            <span className="digit">{formatTime(minutes)}</span>
            <span className="label">MINUTES</span>
          </div>
          <div className="time-unit">
            <span className="digit">{formatTime(seconds)}</span>
            <span className="label">SECONDS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavTimer;
