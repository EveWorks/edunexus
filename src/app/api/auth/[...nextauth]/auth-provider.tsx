"use client";
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return <SessionProvider refetchOnWindowFocus={false} session={session}>{children}</SessionProvider>;
}
