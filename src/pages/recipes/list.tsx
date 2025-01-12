import { protectedPaths } from "@/shared/constants/paths";
import useBreadcrumbStore from "@/shared/stores/breadcrumb-store";
import Head from "next/head";
import { useEffect } from "react";

export default function RecipesList() {
  const { setBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Recipes",
      },
      {
        label: "List",
        href: protectedPaths.recipes.list,
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
