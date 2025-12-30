import { create } from "zustand";
import { Subject } from "../app/components/Home/Subjects/columbs";
import { Habit } from "../app/components/Home/Habits";

type CounterStore = {
  Subjects: Subject[];
  Habits: Habit[];
  timerRunningSubjectId: string | null;
  timer: NodeJS.Timeout | null;
  addSubject: (subject: Subject) => void;
  addHabit: (habit: Habit) => void;
  incrementWorkSecs: (id: string, newWorkSecs: number) => void;
  toggleTimer: (id: string) => void;
};

export const useCounterStore = create<CounterStore>((set, get) => ({
  Subjects: [
    {
      id: "123",
      name: "Maths",
      workSecs: 1234,
      goalWorkSecs: 12345,
      additionInfo: "a;dkfasdf",
      status: "excelent",
      date: "12/12/25",
    },
  ],
  Habits: [{ id: "123", name: "coding", completed: false }],
  timerRunningSubjectId: null,
  timer: null,
  addSubject: ({
    id,
    name,
    workSecs,
    goalWorkSecs,
    additionInfo,
    status,
    date,
  }: Subject) => {
    set((state) => ({
      Subjects: [
        ...state.Subjects,
        { id, name, workSecs, goalWorkSecs, additionInfo, status, date },
      ],
    }));
  },
  addHabit: ({ id, name, completed }: Habit) => {
    set((state) => ({ Habits: [...state.Habits, { id, name, completed }] }));
  },
  incrementWorkSecs: (id: string, newWorkSecs: number) => {
    set((state) => ({
      Subjects: state.Subjects.map((subject) =>
        subject.id === id
          ? { ...subject, workSecs: subject.workSecs + newWorkSecs }
          : subject
      ),
    }));
  },
  toggleTimer: (id: string) => {
    const { timer, timerRunningSubjectId, incrementWorkSecs } = get();
    if (timer) {
      clearInterval(timer);
    }

    if (id === timerRunningSubjectId) {
      set({ timerRunningSubjectId: null, timer: null });
    } else {
      const newTimer = setInterval(() => {
        incrementWorkSecs(id, 1);
      }, 1000);
      set({ timerRunningSubjectId: id, timer: newTimer });
    }
  },
}));
