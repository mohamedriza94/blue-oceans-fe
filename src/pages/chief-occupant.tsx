import { ChiefOccupantComponent } from "@/components/chief-occupant";
import { protectedPaths } from "@/shared/constants/paths";
import useBreadcrumbStore from "@/shared/stores/breadcrumb-store";
import Head from "next/head";
import { useEffect } from "react";

export default function ChiefOccupant() {
  const { setBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Chief Occupant",
        href: protectedPaths.chiefOccupant.path,
      },
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Chief Occupant</title>
      </Head>
      <ChiefOccupantComponent />
    </>
  );
}
