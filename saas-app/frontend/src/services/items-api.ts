import { getPublicApiUrl } from "@/lib/env";
import type { CreateItemInput, Item } from "@saas/shared";

async function authHeaders(accessToken: string): Promise<HeadersInit> {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
}

export async function fetchItems(accessToken: string): Promise<Item[]> {
  const res = await fetch(`${getPublicApiUrl()}/api/items`, {
    headers: await authHeaders(accessToken),
    cache: "no-store",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Failed to load items");
  }
  const data = (await res.json()) as { items: Item[] };
  return data.items;
}

export async function createItemApi(
  accessToken: string,
  input: CreateItemInput
): Promise<Item> {
  const res = await fetch(`${getPublicApiUrl()}/api/items`, {
    method: "POST",
    headers: await authHeaders(accessToken),
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Failed to create item");
  }
  const data = (await res.json()) as { item: Item };
  return data.item;
}

export async function deleteItemApi(
  accessToken: string,
  id: string
): Promise<void> {
  const res = await fetch(`${getPublicApiUrl()}/api/items/${id}`, {
    method: "DELETE",
    headers: await authHeaders(accessToken),
  });
  if (!res.ok && res.status !== 204) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Failed to delete item");
  }
}
