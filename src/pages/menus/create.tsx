import { CreateMenuComponent } from "@/components/menus/create-or-edit-menu/create-menu";
import { protectedPaths } from "@/shared/constants/paths";
import useBreadcrumbStore from "@/shared/stores/breadcrumb-store";
import Head from "next/head";
import { useEffect } from "react";

export default function MenusCreate() {
  const { setBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Menus",
      },
      {
        label: "Create",
        href: protectedPaths.menus.create,
      },
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Menus</title>
      </Head>
      <CreateMenuComponent />
    </>
  );
}
