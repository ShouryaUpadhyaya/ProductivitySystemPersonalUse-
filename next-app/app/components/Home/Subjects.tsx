"use client";
import React, { useState, useEffect } from "react";
import { Subject, columns } from "./Subjects/columbs";
import { DataTable } from "./Subjects/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

function Subjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [runningSubjectId, setRunningSubjectId] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (runningSubjectId) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
        setSubjects((prevSubjects) =>
          prevSubjects.map((subject) =>
            subject.id === runningSubjectId
              ? { ...subject, workSecs: subject.workSecs + 1 }
              : subject
          )
        );
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [runningSubjectId]);

  const addSubject = (name: string, goalWorkSecs: number) => {
    const newSubject: Subject = {
      id: crypto.randomUUID(),
      name,
      workSecs: 0,
      goalWorkSecs,
      status: "not Started",
      date: new Date().toLocaleDateString(),
    };
    setSubjects((prev) => [...prev, newSubject]);
  };

  const toggleTimer = (subjectId: string) => {
    if (runningSubjectId === subjectId) {
      setRunningSubjectId(null);
    } else {
      setRunningSubjectId(subjectId);
    }
  };

  return (
    <section className="container mx-auto py-10">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Subjects</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Subject</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Subject</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const name = (form.elements[0] as HTMLInputElement).value;
                const goalWorkHrs = parseFloat(
                  (form.elements[1] as HTMLInputElement).value
                );
                addSubject(name, goalWorkHrs * 3600);
                form.reset();
              }}
              className="flex flex-col gap-4"
            >
              <Input placeholder="Subject Name" required />
              <Input
                placeholder="Goal Work Hours"
                type="number"
                step="0.1"
                required
              />
              <Button type="submit">Add</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable
        columns={columns({ toggleTimer, runningSubjectId })}
        data={subjects}
      />
    </section>
  );
}

export default Subjects;
