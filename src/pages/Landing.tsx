
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  CodeIcon,
  LayoutDashboardIcon,
  CalendarIcon,
  TagIcon,
  GithubIcon,
  RocketIcon,
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 p-1.5 rounded-md">
              <CodeIcon className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold text-lg">ProjectPilot</span>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <GithubIcon className="h-4 w-4 mr-2" />
                GitHub
              </a>
            </Button>
            <Button asChild size="sm">
              <Link to="/dashboard">
                Launch App
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 flex-grow bg-gradient-to-b from-background to-background/70">
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Track your developer projects with ease
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A minimal project tracker built for solo developers and indie hackers. 
              Focus on building, not managing.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Button asChild size="lg" className="font-medium">
              <Link to="/dashboard">
                Get Started
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <GithubIcon className="h-4 w-4 mr-2" />
                View on GitHub
              </a>
            </Button>
          </div>
          
          {/* Feature showcase image */}
          <div className="relative rounded-lg border border-border overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 pointer-events-none" />
            <img 
              src="/placeholder.svg" 
              alt="ProjectPilot Dashboard" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-secondary/30">
        <div className="container max-w-6xl px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Everything you need, nothing you don't
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<LayoutDashboardIcon className="h-5 w-5 text-primary" />}
              title="Project Dashboard"
              description="View all your projects in one place with status tracking and progress monitoring"
            />
            <FeatureCard 
              icon={<CheckCircle2Icon className="h-5 w-5 text-primary" />}
              title="Task Management"
              description="Create and manage task checklists for each project with deadlines and status"
            />
            <FeatureCard 
              icon={<TagIcon className="h-5 w-5 text-primary" />}
              title="Tech Stack Tagging"
              description="Tag projects with technologies used for easy filtering and organization"
            />
            <FeatureCard 
              icon={<CalendarIcon className="h-5 w-5 text-primary" />}
              title="Calendar View"
              description="Plan your work with a monthly calendar view to track task deadlines"
            />
            <FeatureCard 
              icon={<GithubIcon className="h-5 w-5 text-primary" />}
              title="GitHub Integration"
              description="Link projects to GitHub repositories and track your code alongside tasks"
            />
            <FeatureCard 
              icon={<RocketIcon className="h-5 w-5 text-primary" />}
              title="Deployment Tracking"
              description="Store and access deployment URLs for quick access to your live projects"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-t from-background to-background/70 text-center">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">Ready to take control of your projects?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start tracking your projects today with ProjectPilot's minimal, focused approach.
            No account required to try it out.
          </p>
          <Button asChild size="lg" className="font-medium">
            <Link to="/dashboard">
              Launch App
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ProjectPilot. Made for developers.</p>
          <p className="mt-2">
            Built with React, TypeScript, Tailwind CSS, and Lovable AI.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
