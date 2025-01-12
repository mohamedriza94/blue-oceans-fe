import { ListMenu } from "@/components/menus/list-menu";
import { protectedPaths } from "@/shared/constants/paths";
import useBreadcrumbStore from "@/shared/stores/breadcrumb-store";
import Head from "next/head";
import { useEffect } from "react";

export default function MenusList() {
  const { setBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Menus",
      },
      {
        label: "List",
        href: protectedPaths.menus.list,
      },
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Menus</title>
      </Head>
      <ListMenu />
    </>
  );
}
