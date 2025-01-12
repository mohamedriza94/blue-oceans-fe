import { CreateCategory } from "@/components/categories/create";
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
        label: "Create",
        href: protectedPaths.categories.create,
      },
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Categories</title>
      </Head>
      <CreateCategory />
    </>
  );
}
