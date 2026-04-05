/** Shared types for frontend and backend */

/** Нужен runtime-экспорт: иначе после tsc `dist/index.js` пустой и Webpack/Next может падать. */
export const SAAS_SHARED_PKG = "@saas/shared" as const;

export type Item = {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
};

export type CreateItemInput = {
  title: string;
};

export type ApiErrorBody = {
  error: string;
  details?: unknown;
};
