
import React, { useState } from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project, Task } from "@/types";
import { mockProjects } from "@/data/mockData";
import { formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/StatusBadge";
import { CalendarIcon, CheckCircle2, ListTodoIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const getTasksForDate = (date: Date | undefined) => {
    if (!date) return [];

    const formattedDate = date.toISOString().split("T")[0];
    const tasksForDate: Array<{ task: Task; project: Project }> = [];

    mockProjects.forEach((project) => {
      project.tasks.forEach((task) => {
        if (task.dueDate && task.dueDate.startsWith(formattedDate)) {
          tasksForDate.push({ task, project });
        }
      });
    });

    return tasksForDate;
  };

  const tasksForSelectedDate = getTasksForDate(selectedDate);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Calendar</h1>
      
      <div className="grid gap-6 md:grid-cols-[350px_1fr]">
        <Card>
          <CardContent className="pt-6">
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="pointer-events-auto"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              <CardTitle>
                {selectedDate ? formatDate(selectedDate.toISOString()) : "Select a date"}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {tasksForSelectedDate.length > 0 ? (
              <div className="space-y-4">
                {tasksForSelectedDate.map(({ task, project }) => (
                  <div key={task.id} className="space-y-2">
                    <Link to={`/projects/${project.id}`} className="block">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 
                            className={`h-4 w-4 ${task.completed ? "text-primary" : "text-muted-foreground"}`}
                          />
                          <span className={`text-sm ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                            {task.title}
                          </span>
                        </div>
                        <StatusBadge status={project.status} />
                      </div>
                      <div className="mt-1 flex items-center text-xs text-muted-foreground">
                        <ListTodoIcon className="h-3 w-3 mr-1" />
                        <span>{project.name}</span>
                      </div>
                    </Link>
                    <Separator />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 px-4">
                <div className="text-muted-foreground mb-2">No tasks due on this date</div>
                <p className="text-sm text-muted-foreground">
                  Select another date or add due dates to your tasks
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
