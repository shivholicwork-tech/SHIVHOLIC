"use client";

import * as React from "react";
import { User, Users, Key, Plug, Bell } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences."
      />

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="gap-1">
            <User className="h-3 w-3" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="team" className="gap-1">
            <Users className="h-3 w-3" />
            Team
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-1">
            <Key className="h-3 w-3" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="integrations" className="gap-1">
            <Plug className="h-3 w-3" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1">
            <Bell className="h-3 w-3" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your personal information and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Company name" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage your team and their permissions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm font-medium">You (Owner)</p>
                  <p className="text-xs text-muted-foreground">user@example.com</p>
                </div>
                <Button variant="outline" size="sm">Admin</Button>
              </div>
              <Separator />
              <Button variant="outline" className="gap-2">
                <Users className="h-4 w-4" />
                Invite Member
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage API keys for integrating with external services.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>OpenAI API Key</Label>
                <div className="flex gap-2">
                  <Input type="password" value="sk-...xxxx" readOnly className="flex-1" />
                  <Button variant="outline">Update</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Google Search Console</Label>
                <div className="flex gap-2">
                  <Input placeholder="Not configured" readOnly className="flex-1" />
                  <Button variant="outline">Connect</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connect third-party tools and services.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Google Search Console", connected: true },
                { name: "Google Analytics", connected: false },
                { name: "WordPress", connected: false },
                { name: "Slack", connected: true },
              ].map((integration) => (
                <div key={integration.name} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <Plug className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">{integration.name}</span>
                  </div>
                  <Button variant={integration.connected ? "outline" : "default"} size="sm">
                    {integration.connected ? "Connected" : "Connect"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Email notifications", description: "Get notified about audits and rankings" },
                { label: "Rank change alerts", description: "Alert when keywords change position" },
                { label: "Weekly reports", description: "Receive weekly SEO summary emails" },
                { label: "New backlinks", description: "Notify when new backlinks are detected" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{item.label}</Label>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
