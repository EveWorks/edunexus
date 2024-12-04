"use client";

import { useSession } from "next-auth/react";

export default function useUser() {
  const { data: session }: any = useSession();
  return session?.user.data.user || null;
}
