import type { Metadata } from "next";
import Link from "next/link";
import { appConfig } from "@/config/app.config";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: `Password Reset Successful | ${appConfig.appName}`,
  description: `Your password has been reset | ${appConfig.description}`,
};

export default function ResetPasswordSuccessPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <CardTitle className="text-lg">Password reset successful</CardTitle>
        <CardDescription>
          Your password has been successfully reset. You can now sign in with your new password.
        </CardDescription>
      </CardHeader>
      <CardContent />
      <CardFooter className="justify-center">
        <Button size="lg" asChild>
          <Link href="/auth/sign-in">Go to Sign In</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
