import { AuthProvider } from "@/providers/auth-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SaaS Starter",
  description: "Шаблон SaaS: Next.js, Supabase и Express",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen font-sans`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
