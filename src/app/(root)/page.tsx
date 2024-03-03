'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace("/movie");
  }, [router]);

  return null
};

export default Home;
