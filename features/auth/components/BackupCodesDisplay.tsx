"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

interface BackupCodesDisplayProps {
  codes: string[];
}

export function BackupCodesDisplay({ codes }: BackupCodesDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codes.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-md border bg-muted/50 p-4">
        <div className="grid grid-cols-2 gap-2">
          {codes.map((code, i) => (
            <code
              key={i}
              className="rounded bg-background px-2 py-1 text-center text-xs font-mono"
            >
              {code}
            </code>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Each code can only be used once.
        </p>
        <Button variant="outline" size="sm" onClick={handleCopy}>
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy all
            </>
          )}
        </Button>
      </div>

      <div className="rounded-md bg-amber-500/10 px-3 py-2 text-xs text-amber-600 dark:text-amber-400">
        Save these codes in a secure location. You will need them to access your account if you lose access to your email.
      </div>
    </div>
  );
}
