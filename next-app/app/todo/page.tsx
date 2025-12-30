"use client";
import React, { useState } from "react";
import { useCounterStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { TrashIcon, CornerDownRight } from "lucide-react";

// Small component for adding subtasks
function SubtaskInput({ todoId }: { todoId: string }) {
  const { addSubtask } = useCounterStore();
  const [newSubtaskText, setNewSubtaskText] = useState("");

  const handleAddSubtask = () => {
    if (newSubtaskText.trim()) {
      addSubtask(todoId, newSubtaskText.trim());
      setNewSubtaskText("");
    }
  };

  return (
    <div className="flex gap-2 ml-8 mt-4 ">
      <Input
        value={newSubtaskText}
        onChange={(e) => setNewSubtaskText(e.target.value)}
        placeholder="Add a new subtask"
        onKeyDown={(e) => e.key === "Enter" && handleAddSubtask()}
        className="h-8"
      />
      <Button onClick={handleAddSubtask} size="sm">
        Add
      </Button>
    </div>
  );
}

export default function TodoPage() {
  const {
    Todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
  } = useCounterStore();
  const [newTodoText, setNewTodoText] = useState("");

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      addTodo(newTodoText.trim());
      setNewTodoText("");
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col gap-4">
      <h1 className="text-5xl font-bold mb-4 my-8">To-Do List:</h1>

      <ul className="space-y-4">
        {Todos.map((todo) => (
          <li key={todo.id} className="p-4 rounded-lg bg-card">
            <div className="flex items-center gap-2 py-2">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
                className="scale-150"
              />
              <span
                className={`flex-grow text-2xl ml-4 font-semibold ${
                  todo.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {todo.text}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteTodo(todo.id)}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
            <ul className="mt-2 space-y-2">
              {todo.subtasks.map((subtask) => (
                <li key={subtask.id} className="flex items-center gap-2 ml-8">
                  <CornerDownRight className="h-4 w-4 text-muted-foreground" />
                  <Checkbox
                    checked={subtask.completed}
                    onCheckedChange={() => toggleSubtask(todo.id, subtask.id)}
                  />
                  <span
                    className={`flex-grow ${
                      subtask.completed
                        ? "line-through text-muted-foreground"
                        : ""
                    }`}
                  >
                    {subtask.text}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteSubtask(todo.id, subtask.id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
            <SubtaskInput todoId={todo.id} />
          </li>
        ))}
      </ul>
      <div className="flex gap-2 mt-4">
        <Input
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new to-do"
          onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
        />
        <Button onClick={handleAddTodo}>Add</Button>
      </div>
    </div>
  );
}
