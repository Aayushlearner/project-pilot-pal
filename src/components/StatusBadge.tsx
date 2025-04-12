
import React from "react";
import { Status } from "@/types";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusColors: Record<Status, string> = {
  "planned": "bg-project-planned",
  "in-progress": "bg-project-in-progress",
  "completed": "bg-project-completed",
  "archived": "bg-project-archived",
};

const statusLabels: Record<Status, string> = {
  "planned": "Planned",
  "in-progress": "In Progress",
  "completed": "Completed",
  "archived": "Archived",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        statusColors[status],
        className
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
