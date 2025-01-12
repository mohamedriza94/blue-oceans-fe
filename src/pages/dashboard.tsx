import { protectedPaths } from "@/shared/constants/paths";
import { useStaffLogout } from "@/shared/hooks/use-staff-logout";
import useBreadcrumbStore from "@/shared/stores/breadcrumb-store";
import { Button } from "@mantine/core";
import Head from "next/head";
import { useEffect } from "react";

export default function Dashboard() {
  const { performLogout, isLoading } = useStaffLogout();
  const { setBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Dashboard",
        href: protectedPaths.dashboard,
      },
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      This is the dashboard <br></br>
      <Button onClick={performLogout} loading={isLoading}>
        Logout
      </Button>
    </>
  );
}
