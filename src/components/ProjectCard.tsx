
import React from "react";
import { Project } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDate } from "@/lib/utils";
import { Link } from "react-router-dom";
import { CheckCircle2, GitBranchIcon } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const completedTasks = project.tasks.filter(task => task.completed).length;
  const totalTasks = project.tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Link to={`/projects/${project.id}`}>
      <Card className="hover:shadow-md transition-all duration-200 hover:border-primary/50 h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-medium">{project.name}</CardTitle>
            <StatusBadge status={project.status} />
          </div>
        </CardHeader>
        <CardContent className="py-2 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-secondary px-2 py-1 text-xs"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="inline-flex items-center rounded-full bg-secondary px-2 py-1 text-xs">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
          <div className="w-full bg-secondary rounded-full h-1.5 mb-1">
            <div 
              className="bg-primary h-1.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            <span>
              {completedTasks}/{totalTasks} tasks completed
            </span>
          </div>
        </CardContent>
        <CardFooter className="pt-2 text-xs text-muted-foreground">
          <div className="flex justify-between w-full">
            <div className="flex items-center">
              {project.githubUrl && (
                <GitBranchIcon className="w-3 h-3 mr-1" />
              )}
            </div>
            <span>Updated {formatDate(project.updatedAt)}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
