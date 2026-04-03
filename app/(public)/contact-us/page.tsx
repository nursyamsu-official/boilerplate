import { Metadata } from "next";
import { appConfig } from "@/config/app.config";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: `Contact Us - ${appConfig.appName}`,
  description: `Contact Us - ${appConfig.appNameFull}`,
};

export default function ContactUsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">
        Contact Us - {appConfig.appNameFull}
      </h1>
      <p className="text-sm text-gray-500">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti,
        animi! Suscipit optio sequi ipsam vel sapiente voluptas quaerat
        voluptates quibusdam dolore nam dolor nemo commodi, rerum esse et atque
        eaque.
      </p>
      <Button variant="outline">Contact Us</Button>
    </div>
  );
}
