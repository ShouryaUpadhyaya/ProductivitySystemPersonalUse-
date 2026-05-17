import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type TimerMode = 'POMODORO' | 'NORMAL';
export type PomodoroPhase = 'WORK' | 'BREAK';

interface PomodoroState {
  // Settings
  mode: TimerMode;
  workDuration: number; // in seconds
  breakDuration: number; // in seconds
  resetThreshold: number; // in seconds - if paused longer than this, reset pomodoro
  
  // Session State
  phase: PomodoroPhase;
  breakElapsedSeconds: number;
  
  // Actions
  setMode: (mode: TimerMode) => void;
  setPhase: (phase: PomodoroPhase) => void;
  setDurations: (workSecs: number, breakSecs: number) => void;
  setResetThreshold: (secs: number) => void;
  togglePhase: () => void;
  tickBreak: () => void;
  resetBreak: () => void;
}

export const usePomodoroStore = create<PomodoroState>()(
  persist(
    (set) => ({
      mode: 'POMODORO',
      workDuration: 1500, // 25 minutes default
      breakDuration: 300,  // 5 minutes default
      resetThreshold: 10, // 10 seconds default
      phase: 'WORK',
      breakElapsedSeconds: 0,

      setMode: (mode) => set({ mode }),
      setPhase: (phase) => set({ phase }),
      setDurations: (workDuration, breakDuration) => set({ workDuration, breakDuration }),
      setResetThreshold: (resetThreshold) => set({ resetThreshold }),
      togglePhase: () => set((state) => ({ 
        phase: state.phase === 'WORK' ? 'BREAK' : 'WORK',
        breakElapsedSeconds: 0 
      })),
      tickBreak: () => set((state) => ({ breakElapsedSeconds: state.breakElapsedSeconds + 1 })),
      resetBreak: () => set({ breakElapsedSeconds: 0 }),
    }),
    {
      name: 'pomodoro-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
