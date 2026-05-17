import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface PomodoroState {
  pomodoroTimer: number;
  BreakTimer: number;
  timerMode: boolean;
  changeTimerPomodoro: ({ workSecs, breakSecs }: { workSecs: number; breakSecs: number }) => void;
  changeTimerMode: ({ timermode }: { timermode: boolean }) => void;
}

export const usePomodoroStore = create<PomodoroState>()(
  persist(
    (set) => ({
      pomodoroTimer: 3600,
      BreakTimer: 600,
      timerMode: false,
      changeTimerPomodoro: ({ workSecs, breakSecs }: { workSecs: number; breakSecs: number }) => {
        set({ pomodoroTimer: workSecs, BreakTimer: breakSecs });
      },
      changeTimerMode({ timermode }) {
        set({ timerMode: timermode });
      },
    }),
    {
      name: 'pomodoro-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
