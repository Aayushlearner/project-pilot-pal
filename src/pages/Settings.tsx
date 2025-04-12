
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Info } from "lucide-react";

export default function Settings() {
  const handleConnect = () => {
    toast.info(
      "This would connect to Supabase in a real implementation",
      {
        description: "The app is currently using mock data",
      }
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Manage your account settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-md p-4 bg-secondary/50">
              <div className="flex items-center gap-2 text-primary">
                <Info className="h-4 w-4" />
                <span className="text-sm font-medium">Demo Mode</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                This is a demo app using mock data. In a real implementation, 
                this section would allow you to manage your account settings.
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="connect-supabase" className="text-base">
                  Connect to Supabase
                </Label>
                <p className="text-sm text-muted-foreground">
                  Use your Supabase account for database and authentication
                </p>
              </div>
              <Button variant="outline" onClick={handleConnect}>
                Connect
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>App Settings</CardTitle>
            <CardDescription>
              Configure application preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-save" className="text-base">
                    Auto-save changes
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically save changes when editing fields
                  </p>
                </div>
                <Switch id="auto-save" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-completed" className="text-base">
                    Show completed tasks
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Display completed tasks in project view
                  </p>
                </div>
                <Switch id="show-completed" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="calendar-notifications" className="text-base">
                    Calendar notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications for upcoming task deadlines
                  </p>
                </div>
                <Switch id="calendar-notifications" defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>About ProjectPilot</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              ProjectPilot is a minimal project tracker for solo developers and indie hackers.
              Track your projects, manage tasks, and stay organized with a simple, clean interface.
            </p>
            <p className="text-sm text-muted-foreground">
              Version 1.0.0
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
