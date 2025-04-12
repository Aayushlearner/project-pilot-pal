
import React, { useState } from "react";
import { Project, Status } from "@/types";
import { getProjectsByStatus } from "@/data/mockData";
import { ProjectCard } from "@/components/ProjectCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const projectStatuses: { value: Status | "all"; label: string }[] = [
  { value: "all", label: "All Projects" },
  { value: "in-progress", label: "In Progress" },
  { value: "planned", label: "Planned" },
  { value: "completed", label: "Completed" },
  { value: "archived", label: "Archived" },
];

export default function Dashboard() {
  const [activeStatus, setActiveStatus] = useState<Status | "all">("all");
  const projects = getProjectsByStatus(activeStatus);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
      </div>

      <Tabs
        defaultValue="all"
        value={activeStatus}
        onValueChange={(value) => setActiveStatus(value as Status | "all")}
        className="space-y-4"
      >
        <TabsList>
          {projectStatuses.map((status) => (
            <TabsTrigger key={status.value} value={status.value}>
              {status.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={activeStatus} className="space-y-4">
          {projects.length === 0 ? (
            <div className="text-center p-10">
              <p className="text-muted-foreground">No projects found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project: Project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
