export default function EmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Email</h1>
        <p className="text-sm text-muted-foreground">
          Manage email provider settings, templates, and delivery logs.
        </p>
      </div>
      {children}
    </div>
  );
}
