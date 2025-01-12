import { protectedPaths } from "@/shared/constants/paths";
import useBreadcrumbStore from "@/shared/stores/breadcrumb-store";
import Head from "next/head";
import { useEffect } from "react";

export default function RecipesCreate() {
  const { setBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Recipes",
      },
      {
        label: "Create",
        href: protectedPaths.recipes.create,
      },
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Recipes</title>
      </Head>
    </>
  );
}
