import { EmailNav } from "@/features/email";

export default function EmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <EmailNav />
      {children}
    </div>
  );
}
