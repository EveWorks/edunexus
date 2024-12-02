"use client";

import { useSession } from "next-auth/react";

export const getUser = () => {
  const { data: session }: any = useSession();
  return session?.user.data.user;
};
