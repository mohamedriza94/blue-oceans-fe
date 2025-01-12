import { ListIngredients } from "@/components/ingredients/list-ingredients";
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
        label: "List",
        href: protectedPaths.ingredients.list,
      },
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Ingredients</title>
      </Head>
      <ListIngredients />
    </>
  );
}
