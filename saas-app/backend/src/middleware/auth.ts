import type { NextFunction, Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

export type AuthedRequest = Request & {
  userId?: string;
  accessToken?: string;
};

/**
 * Verifies the Bearer JWT and attaches the Supabase user id when valid.
 * Uses the anon key + user JWT so Row Level Security policies apply.
 */
export async function requireAuth(
  req: AuthedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!supabaseUrl || !supabaseAnonKey) {
    res.status(500).json({ error: "На сервере не настроен Supabase" });
    return;
  }

  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    res.status(401).json({ error: "Нет или неверный заголовок Authorization" });
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    res.status(401).json({ error: "Сессия недействительна или истекла" });
    return;
  }

  req.userId = user.id;
  req.accessToken = token;
  next();
}
