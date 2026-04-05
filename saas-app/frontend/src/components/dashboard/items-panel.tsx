"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import {
  createItemApi,
  deleteItemApi,
  fetchItems,
} from "@/services/items-api";
import type { Item } from "@saas/shared";
import { Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export function ItemsPanel() {
  const { session, initialized } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!session?.access_token) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchItems(session.access_token);
      setItems(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось загрузить записи");
    } finally {
      setLoading(false);
    }
  }, [session?.access_token]);

  useEffect(() => {
    if (!initialized || !session?.access_token) {
      if (initialized && !session) setLoading(false);
      return;
    }
    void load();
  }, [initialized, session?.access_token, load, session]);

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const t = title.trim();
    if (!t || !session?.access_token) return;
    setSaving(true);
    setError(null);
    try {
      const item = await createItemApi(session.access_token, { title: t });
      setItems((prev) => [item, ...prev]);
      setTitle("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось создать запись");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!session?.access_token) return;
    setError(null);
    try {
      await deleteItemApi(session.access_token, id);
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось удалить запись");
    }
  };

  if (!initialized) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full max-w-md" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ваши записи</CardTitle>
        <CardDescription>
          Данные в Supabase с RLS — каждая строка привязана к вашему пользователю.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={addItem} className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1 space-y-2">
            <Label htmlFor="new-title">Новая запись</Label>
            <Input
              id="new-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: созвон с дизайном"
              maxLength={500}
            />
          </div>
          <Button type="submit" disabled={saving || !title.trim()}>
            {saving ? "Добавление…" : "Добавить"}
          </Button>
        </form>

        {error && (
          <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Пока пусто. Добавьте запись выше — данные приходят с API Express с вашим
            JWT Supabase.
          </p>
        ) : (
          <ul className="divide-y rounded-lg border">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 px-4 py-3"
              >
                <div>
                  <p className="font-medium leading-tight">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.created_at).toLocaleString("ru-RU", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => void remove(item.id)}
                  aria-label="Удалить запись"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
