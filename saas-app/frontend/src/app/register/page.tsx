import { RegisterForm } from "@/components/auth/register-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Создайте аккаунт</CardTitle>
          <CardDescription>
            Используйте надёжный пароль. Подтверждение email настраивается в Supabase.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RegisterForm />
          <p className="text-center text-sm text-muted-foreground">
            Уже зарегистрированы?{" "}
            <Button variant="link" className="h-auto p-0" asChild>
              <Link href="/login">Войти</Link>
            </Button>
          </p>
        </CardContent>
      </Card>
      <Button variant="ghost" className="mt-6" asChild>
        <Link href="/">← На главную</Link>
      </Button>
    </div>
  );
}
