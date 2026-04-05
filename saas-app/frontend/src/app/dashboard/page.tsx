import { ItemsPanel } from "@/components/dashboard/items-panel";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your workspace items. API runs on the Node backend; auth is enforced
          with Supabase JWT + Row Level Security.
        </p>
      </div>
      <ItemsPanel />
    </div>
  );
}
