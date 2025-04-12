
import React, { useState } from "react";
import { Task } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, formatDate } from "@/lib/utils";
import { CalendarIcon, Trash2Icon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TaskItemProps {
  task: Task;
  onTaskUpdate: (updatedTask: Task) => void;
  onTaskDelete: (taskId: string) => void;
}

export function TaskItem({ task, onTaskUpdate, onTaskDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [dueDate, setDueDate] = useState<Date | undefined>(
    task.dueDate ? new Date(task.dueDate) : undefined
  );

  const handleCheckboxChange = (checked: boolean) => {
    onTaskUpdate({
      ...task,
      completed: checked,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleSave = () => {
    onTaskUpdate({
      ...task,
      title,
      dueDate: dueDate?.toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setIsEditing(false);
  };

  return (
    <div className={cn(
      "flex items-start gap-2 p-2 rounded-md",
      isEditing ? "bg-muted/50" : "",
      task.completed ? "opacity-60" : ""
    )}>
      <Checkbox
        checked={task.completed}
        onCheckedChange={handleCheckboxChange}
        className="mt-1"
      />
      <div className="flex-grow">
        {isEditing ? (
          <div className="space-y-2">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-8"
              autoFocus
            />
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex gap-2 h-8"
                  >
                    <CalendarIcon className="h-3.5 w-3.5" />
                    {dueDate ? formatDate(dueDate.toISOString()) : "Set date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Button variant="default" size="sm" onClick={handleSave} className="h-8">
                Save
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(false)} className="h-8">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  "text-sm",
                  task.completed ? "line-through text-muted-foreground" : ""
                )}
                onClick={() => setIsEditing(true)}
              >
                {task.title}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-destructive"
                onClick={() => onTaskDelete(task.id)}
              >
                <Trash2Icon className="h-4 w-4" />
              </Button>
            </div>
            {task.dueDate && (
              <div className="flex items-center text-xs text-muted-foreground">
                <CalendarIcon className="h-3 w-3 mr-1" />
                <span>{formatDate(task.dueDate)}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
