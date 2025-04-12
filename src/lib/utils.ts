
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Status } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export function getStatusColor(status: Status): string {
  switch (status) {
    case "planned":
      return "bg-project-planned text-white";
    case "in-progress":
      return "bg-project-in-progress text-white";
    case "completed":
      return "bg-project-completed text-white";
    case "archived":
      return "bg-project-archived text-white";
    default:
      return "bg-gray-500 text-white";
  }
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}
