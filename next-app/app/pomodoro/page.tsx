"use client";
import React from "react";
import { useCounterStore } from "@/store/useStore";
import { ConvertSecsToTimer, pad } from "@/lib/utils";

function Page() {
  const { timerRunningSubjectId, Subjects, pomodoroTimer, toggleTimer } =
    useCounterStore();

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
    <section className="flex justify-center items-center h-screen w-screen ">
      <div
        className="relative h-[80vh] w-[80vh] flex justify-center items-center"
        onClick={() => toggleTimer(runningSubject)}
      >
        <div
          className="absolute w-full h-full rounded-full"
          style={{
            background: `conic-gradient(var(--primary) ${percent}%, var(--card) 0)`,
            transition: "background 0.5s ease-out",
          }}
        />
        <div className="relative text-4xl">
          <h1 className="font-bold text-primary-foreground">
            {pad(hours)} : {pad(minutes)} : {pad(seconds)}
          </h1>
        </div>
      </div>
    </section>
  );
}

export default Page;
