"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileTab } from "./ProfileTab";
import { SecurityTab } from "./SecurityTab";
import { SessionsTab } from "./SessionsTab";

const VALID_TABS = ["profile", "security", "sessions"] as const;
type SettingsTab = (typeof VALID_TABS)[number];

function AccountSettingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawTab = searchParams.get("tab");
  const activeTab: SettingsTab =
    rawTab && VALID_TABS.includes(rawTab as SettingsTab)
      ? (rawTab as SettingsTab)
      : "profile";

  const handleTabChange = (value: string) => {
    if (value === "profile") {
      router.replace("/dashboard/settings");
    } else {
      router.replace(`/dashboard/settings?tab=${value}`);
    }
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

export function AccountSettings() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold">Account Settings</h1>
          <div className="h-8 w-48 animate-pulse rounded bg-muted" />
          <div className="h-64 animate-pulse rounded bg-muted" />
        </div>
      }
    >
      <AccountSettingsContent />
    </Suspense>
  );
}
