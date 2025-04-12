
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Project, Status } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TagInput } from "@/components/TagInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeftIcon, GithubIcon, ExternalLinkIcon } from "lucide-react";
import { toast } from "sonner";
import { generateId } from "@/lib/utils";

export default function NewProject() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({
    name: "",
    description: "",
    status: "planned",
    tags: [],
    tasks: [],
  });

  const updateForm = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real app, you would save to Supabase here
    setTimeout(() => {
      // Create a new project with default values
      const newProject: Project = {
        id: generateId(),
        name: formData.name || "Untitled Project",
        description: formData.description || "",
        status: (formData.status as Status) || "planned",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        githubUrl: formData.githubUrl,
        deploymentUrl: formData.deploymentUrl,
        tags: formData.tags || [],
        tasks: [],
      };

      toast.success("Project created successfully");
      // In a real app with Supabase, we'd redirect to the new project
      navigate("/");
    }, 500);
  };

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

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Create New Project</CardTitle>
            <CardDescription>
              Add the details for your new project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateForm("name", e.target.value)}
                placeholder="My Awesome Project"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateForm("description", e.target.value)}
                placeholder="Describe what your project is about..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status as string}
                onValueChange={(value) => updateForm("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub Repository</Label>
                <div className="flex items-center space-x-2">
                  <GithubIcon className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="githubUrl"
                    value={formData.githubUrl || ""}
                    onChange={(e) => updateForm("githubUrl", e.target.value)}
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
                    value={formData.deploymentUrl || ""}
                    onChange={(e) =>
                      updateForm("deploymentUrl", e.target.value)
                    }
                    placeholder="Deployment URL"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Technologies & Tags</Label>
              <TagInput
                value={formData.tags || []}
                onChange={(tags) => updateForm("tags", tags)}
                placeholder="Add technologies and tags..."
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!formData.name || isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Project"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
