"use client";

import Loader from "@/components/loader";
import useUser from "@/hooks/use-user";
import HomeView from "@/views/home";
import { useRouter } from "next/navigation";
import { useState } from "react";

const HomePage = () => {
  const [flag, setFlag] = useState(false);
  const router = useRouter();
  const user: any = useUser();

  if (user?.id) {
    router.push("/dashboard");
    return;
  }

  return <>{flag ? <HomeView /> : <Loader setFlag={setFlag} />}</>;
};

export default HomePage;
