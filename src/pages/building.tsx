import { BuildingComponent } from "@/components/building";
import { protectedPaths } from "@/shared/constants/paths";
import useBreadcrumbStore from "@/shared/stores/breadcrumb-store";
import Head from "next/head";
import { useEffect } from "react";

export default function Building() {
  const { setBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Building",
        href: protectedPaths.dashboard.icon,
      },
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Building</title>
      </Head>
      <BuildingComponent />
    </>
  );
}
