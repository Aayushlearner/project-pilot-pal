
export type Status = "planned" | "in-progress" | "completed" | "archived";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  githubUrl?: string;
  deploymentUrl?: string;
  tags: string[];
  tasks: Task[];
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  projectId: string;
  taskId?: string;
}
