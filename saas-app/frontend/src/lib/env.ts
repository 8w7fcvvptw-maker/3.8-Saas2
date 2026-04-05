/** Public env used on client — validated at runtime in dev */
export function getPublicApiUrl(): string {
  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
  return base.replace(/\/$/, "");
}
