import { MyLeaseComponent } from "@/components/co/lease/lease";
import { protectedPaths } from "@/shared/constants/paths";
import useBreadcrumbStore from "@/shared/stores/breadcrumb-store";
import Head from "next/head";
import { useEffect } from "react";

export default function Lease() {
  const { setBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Lease",
        href: protectedPaths.co_lease.path,
      },
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Lease</title>
      </Head>
      <MyLeaseComponent />
    </>
  );
}
