import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const useRouteProgress = () => {
  const router = useRouter();
  const [isRouting, setIsRouting] = useState<boolean>(false);

  useEffect(() => {
    const handleStart = () => setIsRouting(true);
    const handleStop = () => setIsRouting(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return isRouting;
};
