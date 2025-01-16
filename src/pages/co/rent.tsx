import { RentComponent } from "@/components/co/rent/rent";
import { protectedPaths } from "@/shared/constants/paths";
import useBreadcrumbStore from "@/shared/stores/breadcrumb-store";
import Head from "next/head";
import { useEffect } from "react";

export default function Rent() {
  const { setBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Rent",
        href: protectedPaths.co_rent.path,
      },
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Rent</title>
      </Head>
      <RentComponent/>
    </>
  );
}
