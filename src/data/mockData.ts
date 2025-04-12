
import { Project, Status } from "@/types";

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Personal Portfolio",
    description: "My developer portfolio website showcasing my projects and skills.",
    status: "in-progress",
    createdAt: "2023-12-01T12:00:00Z",
    updatedAt: "2023-12-10T14:30:00Z",
    githubUrl: "https://github.com/username/portfolio",
    deploymentUrl: "https://portfolio.example.com",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    tasks: [
      {
        id: "101",
        projectId: "1",
        title: "Design homepage layout",
        completed: true,
        createdAt: "2023-12-01T12:00:00Z",
        updatedAt: "2023-12-02T10:00:00Z",
      },
      {
        id: "102",
        projectId: "1",
        title: "Implement projects section",
        completed: true,
        createdAt: "2023-12-02T12:00:00Z",
        updatedAt: "2023-12-04T16:00:00Z",
      },
      {
        id: "103",
        projectId: "1",
        title: "Add contact form",
        completed: false,
        dueDate: "2023-12-15T00:00:00Z",
        createdAt: "2023-12-05T09:00:00Z",
        updatedAt: "2023-12-05T09:00:00Z",
      },
      {
        id: "104",
        projectId: "1",
        title: "Optimize for mobile",
        completed: false,
        dueDate: "2023-12-20T00:00:00Z",
        createdAt: "2023-12-05T09:30:00Z",
        updatedAt: "2023-12-05T09:30:00Z",
      },
    ],
  },
  {
    id: "2",
    name: "Task Management API",
    description: "RESTful API for task management with user authentication and task organization.",
    status: "planned",
    createdAt: "2023-11-15T08:00:00Z",
    updatedAt: "2023-11-20T11:20:00Z",
    githubUrl: "https://github.com/username/task-api",
    tags: ["Node.js", "Express", "MongoDB", "JWT"],
    tasks: [
      {
        id: "201",
        projectId: "2",
        title: "Design database schema",
        completed: false,
        dueDate: "2023-12-25T00:00:00Z",
        createdAt: "2023-11-15T08:00:00Z",
        updatedAt: "2023-11-15T08:00:00Z",
      },
      {
        id: "202",
        projectId: "2",
        title: "Implement user authentication",
        completed: false,
        dueDate: "2023-12-28T00:00:00Z",
        createdAt: "2023-11-15T08:30:00Z",
        updatedAt: "2023-11-15T08:30:00Z",
      },
    ],
  },
  {
    id: "3",
    name: "E-commerce Site",
    description: "Online store for selling handmade crafts with payment processing and inventory management.",
    status: "completed",
    createdAt: "2023-10-05T15:00:00Z",
    updatedAt: "2023-11-10T09:45:00Z",
    githubUrl: "https://github.com/username/ecommerce",
    deploymentUrl: "https://crafts.example.com",
    tags: ["Next.js", "Stripe", "Tailwind CSS", "Prisma"],
    tasks: [
      {
        id: "301",
        projectId: "3",
        title: "Product catalog page",
        completed: true,
        createdAt: "2023-10-05T15:30:00Z",
        updatedAt: "2023-10-10T11:00:00Z",
      },
      {
        id: "302",
        projectId: "3",
        title: "Shopping cart functionality",
        completed: true,
        createdAt: "2023-10-11T08:00:00Z",
        updatedAt: "2023-10-15T16:20:00Z",
      },
      {
        id: "303",
        projectId: "3",
        title: "Payment integration",
        completed: true,
        createdAt: "2023-10-16T09:00:00Z",
        updatedAt: "2023-10-20T14:00:00Z",
      },
    ],
  },
  {
    id: "4",
    name: "Markdown Note Editor",
    description: "Web-based note-taking app with Markdown support and cloud sync.",
    status: "archived",
    createdAt: "2023-09-01T10:00:00Z",
    updatedAt: "2023-09-30T17:00:00Z",
    githubUrl: "https://github.com/username/markdown-notes",
    tags: ["React", "Firebase", "CodeMirror", "Material UI"],
    tasks: [
      {
        id: "401",
        projectId: "4",
        title: "Editor component",
        completed: true,
        createdAt: "2023-09-01T10:30:00Z",
        updatedAt: "2023-09-05T11:20:00Z",
      },
      {
        id: "402",
        projectId: "4",
        title: "Markdown preview",
        completed: true,
        createdAt: "2023-09-06T09:00:00Z",
        updatedAt: "2023-09-10T15:45:00Z",
      },
      {
        id: "403",
        projectId: "4",
        title: "Cloud sync",
        completed: true,
        createdAt: "2023-09-11T08:30:00Z",
        updatedAt: "2023-09-20T16:00:00Z",
      },
    ],
  },
];

export const commonTechTags = [
  "React", "Next.js", "Vue.js", "Angular", "Svelte", 
  "Node.js", "Express", "Django", "Flask", "Laravel", 
  "PostgreSQL", "MongoDB", "MySQL", "Firebase", "Supabase", 
  "GraphQL", "REST API", "TypeScript", "JavaScript", "Python", 
  "Java", "Go", "Rust", "C#", "PHP", 
  "Tailwind CSS", "SASS", "Material UI", "Bootstrap", "Chakra UI", 
  "AWS", "Azure", "Google Cloud", "Vercel", "Netlify", 
  "Docker", "Kubernetes", "CI/CD", "Git", "GitHub Actions",
  "Redux", "Zustand", "MobX", "Context API", "Recoil"
];

export function getProjectsByStatus(status: Status | "all"): Project[] {
  if (status === "all") {
    return mockProjects;
  }
  return mockProjects.filter(project => project.status === status);
}

export function getProjectById(id: string): Project | undefined {
  return mockProjects.find(project => project.id === id);
}
