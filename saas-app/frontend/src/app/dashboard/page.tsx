import { ItemsPanel } from "@/components/dashboard/items-panel";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Панель управления</h1>
        <p className="text-muted-foreground">
          Управляйте записями рабочего пространства. API на Node (Express); доступ
          проверяется по JWT Supabase и политикам Row Level Security.
        </p>
      </div>
      <ItemsPanel />
    </div>
  );
}
