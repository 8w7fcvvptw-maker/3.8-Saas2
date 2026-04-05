/** Shared types for frontend and backend */

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
