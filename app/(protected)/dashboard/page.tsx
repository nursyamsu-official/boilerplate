import { Metadata } from "next";
import Link from "next/link";
import { appConfig } from "@/config/app.config";
import { Button } from "@/components/ui/button";
import { authRoutes } from "@/features/auth";

export const metadata: Metadata = {
  title: `Dashboard - ${appConfig.appName}`,
  description: `Dashboard - ${appConfig.appNameFull}`,
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Dashboard - {appConfig.appNameFull}
      </h1>
      <p className="text-sm text-gray-500">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti,
        animi! Suscipit optio sequi ipsam vel sapiente voluptas quaerat
        voluptates quibusdam dolore nam dolor nemo commodi, rerum esse et atque
        eaque.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline">Go to Dashboard</Button>
        <Button asChild>
          <Link href={authRoutes.security}>Change password</Link>
        </Button>
      </div>
    </div>
  );
}
