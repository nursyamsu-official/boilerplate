import { EmailNav } from "@/features/email";

export default function EmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Email</h1>
        <p className="text-sm text-muted-foreground">
          Manage email provider settings, templates, and delivery logs.
        </p>
      </div>
      <EmailNav />
      <div className="mt-6">{children}</div>
    </div>
  );
}
