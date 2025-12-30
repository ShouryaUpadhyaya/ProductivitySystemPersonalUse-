import React from "react";
import { useCounterStore } from "@/store/useStore";
import { ConvertSecsToTimer } from "@/lib/utils";
import ClockCircle from "./ClockCircle";
import ClockTime from "./ClockTime";

function Clock() {
  const { timerRunningSubjectId, Subjects, pomodoroTimer } = useCounterStore();

  const runningSubject = Subjects.find(
    (subject) => subject.id === timerRunningSubjectId
  );

  const workSecs = runningSubject?.workSecs ?? pomodoroTimer;
  const goalWorkSecs = runningSubject?.goalWorkSecs;

  let { hours, minutes, seconds, percent } = ConvertSecsToTimer({
    workSecs,
    goalWorkSecs,
  });

  if (!runningSubject) {
    percent = 100;
  }

  return (
    <section className="flex justify-center items-center">
      <div className="relative flex justify-center items-center">
        <ClockCircle percent={percent} size="sm" />
        <div className="absolute">
          <ClockTime
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            color={"#fff"}
          />
        </div>
      </div>
    </section>
  );
}

export default Clock;
