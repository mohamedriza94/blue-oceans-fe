import { ListCategories } from "@/components/categories/list-categories";
import { protectedPaths } from "@/shared/constants/paths";
import useBreadcrumbStore from "@/shared/stores/breadcrumb-store";
import Head from "next/head";
import { useEffect } from "react";

export default function CategoriesCreate() {
  const { setBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Categories",
      },
      {
        label: "List",
        href: protectedPaths.categories.list,
      },
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Categories</title>
      </Head>
      <ListCategories />
    </>
  );
}
