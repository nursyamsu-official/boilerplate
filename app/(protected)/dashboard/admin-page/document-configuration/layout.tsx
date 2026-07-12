import { DocumentConfigurationNav } from "@/features/document-configuration";

export default function DocumentConfigurationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <DocumentConfigurationNav />
      {children}
    </div>
  );
}
