import { LoginForm } from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Sign in with your email and password to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
            <LoginForm />
          </Suspense>
          <p className="text-center text-sm text-muted-foreground">
            No account?{" "}
            <Button variant="link" className="h-auto p-0" asChild>
              <Link href="/register">Create one</Link>
            </Button>
          </p>
        </CardContent>
      </Card>
      <Button variant="ghost" className="mt-6" asChild>
        <Link href="/">← Back to home</Link>
      </Button>
    </div>
  );
}
