"use client"
import Loader from "@/components/loader";
import HomeView from "@/views/home"
import { useState } from "react";

const HomePage = () => {
    const [flag, setFlag] = useState(false);
    // return <>{<Loader setFlag={setFlag} />}</>;
    return <>{flag ? <HomeView /> : <Loader setFlag={setFlag} />}</>;
}

export default HomePage