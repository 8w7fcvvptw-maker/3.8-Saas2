/** Типичные сообщения Supabase Auth → русский (остальное показываем как есть). */
const AUTH_ERROR_MAP: Record<string, string> = {
  "Invalid login credentials": "Неверный email или пароль",
  "Invalid email or password": "Неверный email или пароль",
  "Email not confirmed": "Подтвердите email по ссылке из письма",
  "User already registered": "Пользователь с таким email уже зарегистрирован",
  "Password should be at least 6 characters":
    "Пароль должен быть не короче 6 символов",
  "Signup requires a valid password": "Укажите корректный пароль",
};

export function mapAuthErrorMessage(message: string): string {
  return AUTH_ERROR_MAP[message] ?? message;
}
