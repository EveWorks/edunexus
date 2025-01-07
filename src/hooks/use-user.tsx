"use client";

import { useSession } from "next-auth/react";

export default function useUser() {
  const { data: session, update }: any = useSession();
  const user = session?.user.data.user;
  const token = session?.user.data.tokens;
  const subscription = session?.user.data.subscription;

  const updateUser = async (data: any) => {
    await update({
      tokens: token,
      user: { ...user, ...data },
      subscription,
    });
  };

  const updateSubscription = async (data: any) => {
    await update({
      tokens: token,
      user: user,
      subscription: data,
    });
  };

  return { user, token, updateUser, updateSubscription };
}
