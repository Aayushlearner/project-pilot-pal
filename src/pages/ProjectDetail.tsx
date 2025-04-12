
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Project, Task } from "@/types";
import { getProjectById } from "@/data/mockData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TagInput } from "@/components/TagInput";
import {
  CalendarIcon,
  CheckIcon,
  ChevronLeftIcon,
  ExternalLinkIcon,
  GithubIcon,
  ListTodoIcon,
  PlusIcon,
} from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { TaskItem } from "@/components/TaskItem";
import { formatDate, generateId } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    if (id) {
      const fetchedProject = getProjectById(id);
      if (fetchedProject) {
        setProject(fetchedProject);
      } else {
        navigate("/not-found");
      }
    }
  }, [id, navigate]);

  const handleProjectUpdate = (updatedFields: Partial<Project>) => {
    if (!project) return;

    const updatedProject = {
      ...project,
      ...updatedFields,
      updatedAt: new Date().toISOString(),
    };
    setProject(updatedProject);
    toast.success("Project updated");
    // In a real app, this is where you'd save to backend
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!project || !newTaskTitle.trim()) return;

    const newTask: Task = {
      id: generateId(),
      projectId: project.id,
      title: newTaskTitle,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedTasks = [...project.tasks, newTask];
    handleProjectUpdate({ tasks: updatedTasks });
    setNewTaskTitle("");
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    if (!project) return;

    const updatedTasks = project.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    handleProjectUpdate({ tasks: updatedTasks });
  };

  const handleTaskDelete = (taskId: string) => {
    if (!project) return;

    const updatedTasks = project.tasks.filter((task) => task.id !== taskId);
    handleProjectUpdate({ tasks: updatedTasks });
    toast.success("Task deleted");
  };

  if (!project) {
    return <div>Loading project...</div>;
  }

  const completedTasksCount = project.tasks.filter((task) => task.completed).length;

  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        className="mb-4"
        onClick={() => navigate("/")}
      >
        <ChevronLeftIcon className="mr-2 h-4 w-4" />
        Back to Projects
      </Button>

      <div className="grid gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <Input
                  value={project.name}
                  onChange={(e) => handleProjectUpdate({ name: e.target.value })}
                  className="text-2xl font-bold p-0 h-auto border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <CardDescription className="mt-1">
                  Created on {formatDate(project.createdAt)} • Last updated{" "}
                  {formatDate(project.updatedAt)}
                </CardDescription>
              </div>
              <Select
                value={project.status}
                onValueChange={(value) =>
                  handleProjectUpdate({ status: value as any })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue>
                    <StatusBadge status={project.status as any} />
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planned">
                    <StatusBadge status="planned" />
                  </SelectItem>
                  <SelectItem value="in-progress">
                    <StatusBadge status="in-progress" />
                  </SelectItem>
                  <SelectItem value="completed">
                    <StatusBadge status="completed" />
                  </SelectItem>
                  <SelectItem value="archived">
                    <StatusBadge status="archived" />
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={project.description}
                onChange={(e) =>
                  handleProjectUpdate({ description: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub Repository</Label>
                <div className="flex items-center space-x-2">
                  <GithubIcon className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="githubUrl"
                    value={project.githubUrl || ""}
                    onChange={(e) =>
                      handleProjectUpdate({ githubUrl: e.target.value })
                    }
                    placeholder="GitHub repository URL"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deploymentUrl">Deployment URL</Label>
                <div className="flex items-center space-x-2">
                  <ExternalLinkIcon className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="deploymentUrl"
                    value={project.deploymentUrl || ""}
                    onChange={(e) =>
                      handleProjectUpdate({ deploymentUrl: e.target.value })
                    }
                    placeholder="Deployment URL"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Technologies & Tags</Label>
              <TagInput
                value={project.tags}
                onChange={(tags) => handleProjectUpdate({ tags })}
                placeholder="Add technologies and tags..."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ListTodoIcon className="h-5 w-5 text-primary" />
                <CardTitle>Tasks</CardTitle>
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <CheckIcon className="h-4 w-4" />
                <span>
                  {completedTasksCount} of {project.tasks.length} completed
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleAddTask} className="flex gap-2">
              <Input
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Add a new task..."
                className="flex-grow"
              />
              <Button type="submit" size="sm" disabled={!newTaskTitle.trim()}>
                <PlusIcon className="h-4 w-4 mr-1" /> Add
              </Button>
            </form>

            <Separator />

            <div className="space-y-1">
              {project.tasks.length === 0 ? (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  No tasks yet. Add your first task above.
                </div>
              ) : (
                <>
                  <div className="space-y-1">
                    {project.tasks
                      .filter((task) => !task.completed)
                      .map((task) => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          onTaskUpdate={handleTaskUpdate}
                          onTaskDelete={handleTaskDelete}
                        />
                      ))}
                  </div>

                  {project.tasks.some((task) => task.completed) && (
                    <>
                      <Separator className="my-4" />
                      <div className="text-sm text-muted-foreground mb-2">
                        Completed
                      </div>
                      <div className="space-y-1">
                        {project.tasks
                          .filter((task) => task.completed)
                          .map((task) => (
                            <TaskItem
                              key={task.id}
                              task={task}
                              onTaskUpdate={handleTaskUpdate}
                              onTaskDelete={handleTaskDelete}
                            />
                          ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
