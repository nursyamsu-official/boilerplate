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
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: `Reset Link Sent | ${appConfig.appName}`,
  description: `Password reset link sent | ${appConfig.description}`,
};

export default function ForgotPasswordSuccessPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-full bg-primary/10">
          <Mail className="size-5 text-primary" />
        </div>
        <CardTitle className="text-lg">Check your email</CardTitle>
        <CardDescription>
          Reset password link has been sent to your email. Please check your inbox and follow the
          instructions to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-xs text-muted-foreground">
          Didn&apos;t receive the email? Check your spam folder or try again.
        </p>
      </CardContent>
      <CardFooter className="justify-center gap-2">
        <Button variant="outline" size="lg" asChild>
          <Link href="/auth/forgot-password">Try Again</Link>
        </Button>
        <Button size="lg" asChild>
          <Link href="/auth/sign-in">Back to Sign In</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
