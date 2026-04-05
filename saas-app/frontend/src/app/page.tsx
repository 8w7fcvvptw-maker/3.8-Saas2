import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard, Shield } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <span className="text-lg font-semibold tracking-tight">SaaS Starter</span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Войти</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Начать</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <section className="mx-auto flex max-w-6xl flex-1 flex-col justify-center gap-10 px-4 py-20 sm:px-6 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex-1 space-y-6">
            <p className="inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
              Next.js · Supabase · TypeScript
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Запускайте безопасный мультитенантный SaaS быстрее
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              Вход по email и паролю, изоляция данных на уровне строк (RLS) и
              аккуратный дашборд с CRUD — готовые паттерны, которые можно развивать.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/register">
                  Попробовать бесплатно <ArrowRight className="ml-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">У меня уже есть аккаунт</Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4 rounded-2xl border bg-card p-8 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-semibold">RLS по умолчанию</h2>
                <p className="text-sm text-muted-foreground">
                  Политики PostgreSQL: каждый пользователь видит только свои строки.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-semibold">Готовый дашборд</h2>
                <p className="text-sm text-muted-foreground">
                  Боковая панель, состояния загрузки и проверка данных на API.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        Собрано на Next.js App Router и Supabase Auth.
      </footer>
    </div>
  );
}
