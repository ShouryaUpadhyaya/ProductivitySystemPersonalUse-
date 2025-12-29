"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { IoIosPlay, IoIosPause } from "react-icons/io";

export type Subject = {
  id: string;
  name: string;
  workSecs: number;
  goalWorkSecs: number;
  status: "not Started" | "good progress" | "excelent" | "failed";
  date: string;
  additionInfo?: string;
};

export const columns = ({
  toggleTimer,
  runningSubjectId,
}: {
  toggleTimer: (subjectId: string) => void;
  runningSubjectId: string | null;
}): ColumnDef<Subject>[] => [
  {
    id: "actions",
    cell: ({ row }) => {
      const subject = row.original;
      const isRunning = runningSubjectId === subject.id;
      return (
        <Button onClick={() => toggleTimer(subject.id)} variant="ghost">
          {isRunning ? <IoIosPause /> : <IoIosPlay />}
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Subject",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    header: "Progress",
    cell: ({ row }) => {
      const { workSecs, goalWorkSecs } = row.original;
      const percent =
        goalWorkSecs > 0 ? Math.round((workSecs / goalWorkSecs) * 100) : 0;
      return `${percent}%`;
    },
  },
  {
    accessorKey: "workSecs",
    header: "Worked (hrs)",
    cell: ({ row }) => {
      const { workSecs, goalWorkSecs } = row.original;

      const hours = Math.floor(workSecs / 3600);
      const minutes = Math.floor((workSecs % 3600) / 60);
      const seconds = Math.floor(workSecs % 60);

      const percent =
        goalWorkSecs > 0 ? Math.round((workSecs / goalWorkSecs) * 100) : 0;

      const hue = Math.min(120, (percent / 100) * 120);
      // 0   = red
      // 60  = yellow
      // 120 = green

      const style = {
        color: `hsl(${hue}, 80%, 45%)`,
      };

      const pad = (n: number) => String(n).padStart(2, "0");

      return (
        <span style={style}>
          {`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`}
        </span>
      );
    },
  },
  {
    accessorKey: "goalWorkSecs",
    header: "Goal (hrs)",
    cell: ({ row }) => {
      const { goalWorkSecs } = row.original;
      return (goalWorkSecs / 3600).toFixed(1);
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];
