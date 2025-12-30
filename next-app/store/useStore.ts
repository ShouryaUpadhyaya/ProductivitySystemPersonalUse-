import { create } from "zustand";
import { Subject } from "../app/components/Home/Subjects/columbs";
import { Habit } from "../app/components/Home/Habits";

export type Subtask = {
  id: string;
  text: string;
  completed: boolean;
};

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  subtasks: Subtask[];
};

type CounterStore = {
  Subjects: Subject[];
  Habits: Habit[];
  Todos: Todo[];
  timerRunningSubjectId: string | null;
  timer: NodeJS.Timeout | null;
  pomodoroTimer: number;
  addSubject: (subject: Subject) => void;
  addHabit: (habit: Habit) => void;
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  addSubtask: (todoId: string, text: string) => void;
  toggleSubtask: (todoId: string, subtaskId: string) => void;
  deleteSubtask: (todoId: string, subtaskId: string) => void;
  incrementWorkSecs: (id: string, newWorkSecs: number) => void;
  toggleTimer: (id: string) => void;
};

export const useCounterStore = create<CounterStore>((set, get) => ({
  pomodoroTimer: 3600,
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
  Todos: [],
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
  addTodo: (text: string) => {
    set((state) => ({
      Todos: [
        ...state.Todos,
        { id: crypto.randomUUID(), text, completed: false, subtasks: [] },
      ],
    }));
  },
  toggleTodo: (id: string) => {
    set((state) => ({
      Todos: state.Todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  },
  deleteTodo: (id: string) => {
    set((state) => ({
      Todos: state.Todos.filter((todo) => todo.id !== id),
    }));
  },
  addSubtask: (todoId: string, text: string) => {
    set((state) => ({
      Todos: state.Todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: [
                ...todo.subtasks,
                { id: crypto.randomUUID(), text, completed: false },
              ],
            }
          : todo
      ),
    }));
  },
  toggleSubtask: (todoId: string, subtaskId: string) => {
    set((state) => ({
      Todos: state.Todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? { ...subtask, completed: !subtask.completed }
                  : subtask
              ),
            }
          : todo
      ),
    }));
  },
  deleteSubtask: (todoId: string, subtaskId: string) => {
    set((state) => ({
      Todos: state.Todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.filter(
                (subtask) => subtask.id !== subtaskId
              ),
            }
          : todo
      ),
    }));
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
