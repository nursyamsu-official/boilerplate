"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { listSessions, revokeSession, useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type SessionItem = {
  id: string;
  token: string;
  userAgent?: string | null;
  ipAddress?: string | null;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
  expiresAt?: Date | string | null;
};

const formatDateTime = (value?: Date | string | null) => {
  if (!value) return "-";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return format(date, "dd MMM yyyy, HH.mm", { locale: idLocale });
};

export function SessionsTab() {
  const { data: currentSession } = useSession();
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  const fetchSessions = async () => {
    const res = await listSessions();
    if (res.data) {
      setSessions(res.data as unknown as SessionItem[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleRevoke = async (token: string, sessionId: string) => {
    setRevokingId(sessionId);
    toast.promise(
      revokeSession({ token }).then((res) => {
        if (res.error)
          throw new Error(res.error.message ?? "Failed to revoke session");
        setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      }),
      {
        loading: "Revoking...",
        success: "Session revoked",
        error: "Failed to revoke session",
      },
    );
    setRevokingId(null);
  };

  const currentSessionToken = currentSession?.session?.token;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 pt-4">
        <div className="h-48 animate-pulse rounded-lg border bg-muted" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pt-4">
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>
            These are all the active sessions of your account. Click the X to
            end a specific session.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {sessions.map((session) => {
            const isCurrent = session.token === currentSessionToken;
            return (
              <div
                key={session.id}
                className="flex items-start justify-between rounded-lg border p-4"
              >
                <div className="flex flex-col gap-1.5">
                  <p className="text-sm font-medium">
                    {isCurrent ? "Current session" : "Other session"}
                  </p>
                  <p className="text-xs text-muted-foreground break-all">
                    {session.userAgent ?? "Unknown device"}
                  </p>
                  {session.ipAddress && (
                    <p className="text-xs text-muted-foreground">
                      {session.ipAddress}
                    </p>
                  )}
                  <div className="mt-1 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                    <span className="font-medium">Login at</span>
                    <span>{formatDateTime(session.createdAt)}</span>
                    <span className="font-medium">Last active</span>
                    <span>{formatDateTime(session.updatedAt)}</span>
                    <span className="font-medium">Expires</span>
                    <span>{formatDateTime(session.expiresAt)}</span>
                  </div>
                </div>
                {!isCurrent && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 cursor-pointer"
                    onClick={() => handleRevoke(session.token, session.id)}
                    disabled={revokingId === session.id}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            );
          })}

          {sessions.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No active sessions found.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
