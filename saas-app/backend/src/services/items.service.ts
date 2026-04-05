import { createClient } from "@supabase/supabase-js";
import type { CreateItemInput, Item } from "@saas/shared";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

function userClient(accessToken: string) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function listItems(accessToken: string): Promise<Item[]> {
  const supabase = userClient(accessToken);
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Item[];
}

export async function createItem(
  accessToken: string,
  input: CreateItemInput
): Promise<Item> {
  const supabase = userClient(accessToken);
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser(accessToken);
  if (userErr || !user) throw userErr ?? new Error("Нет доступа");

  const { data, error } = await supabase
    .from("items")
    .insert({ title: input.title.trim(), user_id: user.id })
    .select()
    .single();

  if (error) throw error;
  return data as Item;
}

export async function deleteItem(
  accessToken: string,
  id: string
): Promise<void> {
  const supabase = userClient(accessToken);
  const { error } = await supabase.from("items").delete().eq("id", id);
  if (error) throw error;
}
