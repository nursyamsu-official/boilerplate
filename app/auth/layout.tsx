import Link from "next/link";
import { appConfig } from "@/config/app.config";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-8">
      <Link href="/" className="mb-6 text-center">
        <h1 className="font-heading text-lg font-semibold">{appConfig.appName}</h1>
      </Link>
      {children}
    </div>
  );
}
