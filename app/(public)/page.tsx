import { Button } from "@/components/ui/button";
import { appConfig } from "@/config/app.config";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to {appConfig.appNameFull}</h1>
      <Button variant="outline">Click me</Button>
      <p className="text-sm text-gray-500">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti,
        animi! Suscipit optio sequi ipsam vel sapiente voluptas quaerat
        voluptates quibusdam dolore nam dolor nemo commodi, rerum esse et atque
        eaque.
      </p>
    </div>
  );
}
