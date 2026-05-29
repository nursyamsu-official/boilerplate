import type { Metadata } from "next";
import { appConfig } from "@/config/app.config";

export const metadata: Metadata = {
  title: `Menus | ${appConfig.appName}`,
  description: `Menu Management Settings | ${appConfig.description}`,
};

export default function MenusPage() {
  return (
    <div>
      <h1>Menu Management</h1>
    </div>
  );
}
