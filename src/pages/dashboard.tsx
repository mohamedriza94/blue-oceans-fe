import { protectedPaths } from "@/shared/constants/paths";
import useBreadcrumbStore from "@/shared/stores/breadcrumb-store";
import Head from "next/head";
import { useEffect } from "react";

export default function Dashboard() {
  const { setBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Dashboard",
        href: protectedPaths.dashboard.path,
      },
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      This is the dashboard <br></br>
    </>
  );
}
