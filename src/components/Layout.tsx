
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  Layers3Icon,
  PlusIcon,
  Settings2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="bg-sidebar border-r border-border md:w-64 md:flex-shrink-0">
        <div className="p-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary/20 p-2 rounded-md">
              <Layers3Icon className="h-6 w-6 text-primary" />
            </div>
            <span className="font-bold text-xl">ProjectPilot</span>
          </Link>
        </div>

        <div className="px-3 py-2">
          <Button
            asChild
            className="w-full justify-start gap-2"
          >
            <Link to="/projects/new">
              <PlusIcon className="h-4 w-4" />
              New Project
            </Link>
          </Button>
        </div>

        <nav className="mt-4 space-y-1 px-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "flex items-center px-3 py-2 text-sm rounded-md",
                isActive
                  ? "bg-secondary text-foreground"
                  : "hover:bg-secondary/50 text-muted-foreground"
              )
            }
            end
          >
            <Layers3Icon className="h-4 w-4 mr-3" />
            Dashboard
          </NavLink>
          <NavLink
            to="/calendar"
            className={({ isActive }) =>
              cn(
                "flex items-center px-3 py-2 text-sm rounded-md",
                isActive
                  ? "bg-secondary text-foreground"
                  : "hover:bg-secondary/50 text-muted-foreground"
              )
            }
          >
            <CalendarIcon className="h-4 w-4 mr-3" />
            Calendar
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              cn(
                "flex items-center px-3 py-2 text-sm rounded-md",
                isActive
                  ? "bg-secondary text-foreground"
                  : "hover:bg-secondary/50 text-muted-foreground"
              )
            }
          >
            <Settings2Icon className="h-4 w-4 mr-3" />
            Settings
          </NavLink>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-grow h-full overflow-auto">
        <div className="container py-4 px-6 max-w-6xl">
          {children}
        </div>
      </div>
    </div>
  );
}
