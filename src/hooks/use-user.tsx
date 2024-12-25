"use client";

import { useSession } from "next-auth/react";

export default function useUser() {
  const { data: session, update }: any = useSession();
  const user = session?.user.data.user;
  const token = session?.user.data.tokens;

  const updateUser = async (data: any) => {
    await update({
      tokens: session.user.data.tokens,
      user: { ...user, ...data },
    });
  };

  return { user, token, updateUser };
}
