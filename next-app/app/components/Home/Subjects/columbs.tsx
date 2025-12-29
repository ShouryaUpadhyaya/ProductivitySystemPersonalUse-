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
      const workHrs = Math.round(workSecs / 3600);
      const workMins = Math.round(workSecs % 3600);
      const workSecsToShow = Math.round(workSecs % 60);
      const percent =
        goalWorkSecs > 0 ? Math.round((workSecs / goalWorkSecs) * 100) : 0;

      const hue = Math.min(120, (percent / 100) * 120);
      // 0   = red
      // 60  = yellow
      // 120 = green

      const style = {
        color: `hsl(${hue}, 80%, 45%)`,
      };

      return (
        <span style={style}>
          `${workHrs.toFixed(2)}:${workMins.toFixed(2)}:$
          {workSecsToShow.toFixed(2)}`
        </span>
      );
    },
  },
  {
    accessorKey: "goalWorkHrs",
    header: "Goal (hrs)",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
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
];
