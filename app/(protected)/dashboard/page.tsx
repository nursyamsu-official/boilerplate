import { Metadata } from "next";
import { appConfig } from "@/config/app.config";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Dashboard - ${appConfig.appName}`,
  description: `Dashboard - ${appConfig.appNameFull}`,
};

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">
        Dashboard - {appConfig.appNameFull}
      </h1>
      <p className="text-sm text-gray-500">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti,
        animi! Suscipit optio sequi ipsam vel sapiente voluptas quaerat
        voluptates quibusdam dolore nam dolor nemo commodi, rerum esse et atque
        eaque.
      </p>
      <Button variant="outline">Go to Dashboard</Button>
      <Button asChild variant="outline">
        <Link href="/dashboard/settings/security/change-password">
          Security Settings
        </Link>
      </Button>
    </div>
  );
}
