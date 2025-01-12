import { protectedPaths } from "@/shared/constants/paths";
import useBreadcrumbStore from "@/shared/stores/breadcrumb-store";
import Head from "next/head";
import { useEffect } from "react";

export default function BlogsList() {
  const { setBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Blogs",
      },
      {
        label: "List",
        href: protectedPaths.blogs.list,
      },
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Blogs</title>
      </Head>
    </>
  );
}
