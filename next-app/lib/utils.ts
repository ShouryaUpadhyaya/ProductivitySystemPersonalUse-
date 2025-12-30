import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function ConvertSecsToTimer({
  workSecs,
  goalWorkSecs,
}: {
  workSecs: number;
  goalWorkSecs?: number;
}) {
  const hours = Math.floor(workSecs / 3600);
  const minutes = Math.floor((workSecs % 3600) / 60);
  const seconds = Math.floor(workSecs % 60);
  let percent = 0;
  if (goalWorkSecs && goalWorkSecs > 0) {
    percent = Math.round((workSecs / goalWorkSecs) * 100);
  }
  return { hours, minutes, seconds, percent };
}

export const pad = (n: number) => String(n).padStart(2, "0");
