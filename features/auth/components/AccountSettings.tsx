"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileTab } from "@/features/auth/components/ProfileTab";
import { SecurityTab } from "@/features/auth/components/SecurityTab";
import { SessionsTab } from "@/features/auth/components/SessionsTab";

const VALID_TABS = ["profile", "security", "sessions"] as const;
type SettingsTab = (typeof VALID_TABS)[number];

function getInitialTab(): SettingsTab {
  if (typeof window === "undefined") return "profile";
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("tab");
  if (raw && (VALID_TABS as readonly string[]).includes(raw)) {
    return raw as SettingsTab;
  }
  return "profile";
}

export function AccountSettings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>(getInitialTab);

  const handleTabChange = (value: string) => {
    const tab = value as SettingsTab;
    setActiveTab(tab);

    const url =
      tab === "profile"
        ? "/dashboard/settings"
        : `/dashboard/settings?tab=${tab}`;
    window.history.replaceState(null, "", url);
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Account Settings</h1>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList variant="line">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileTab />
        </TabsContent>

        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>

        <TabsContent value="sessions">
          <SessionsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
