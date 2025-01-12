import { CreateIngredient } from "@/components/ingredients/create";
import { protectedPaths } from "@/shared/constants/paths";
import useBreadcrumbStore from "@/shared/stores/breadcrumb-store";
import Head from "next/head";
import { useEffect } from "react";

export default function IngredientsCreate() {
  const { setBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Ingredients",
      },
      {
        label: "Create",
        href: protectedPaths.ingredients.create,
      },
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Ingredients</title>
      </Head>
      <CreateIngredient />
    </>
  );
}
