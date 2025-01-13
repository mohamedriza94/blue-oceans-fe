import { ApartmentComponent } from "@/components/apartment";
import { protectedPaths } from "@/shared/constants/paths";
import useBreadcrumbStore from "@/shared/stores/breadcrumb-store";
import Head from "next/head";
import { useEffect } from "react";

export default function Building() {
  const { setBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Apartment",
        href: protectedPaths.apartment.path,
      },
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Apartment</title>
      </Head>
      <ApartmentComponent />
    </>
  );
}
