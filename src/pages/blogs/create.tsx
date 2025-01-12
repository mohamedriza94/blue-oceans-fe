import { protectedPaths } from "@/shared/constants/paths";
import useBreadcrumbStore from "@/shared/stores/breadcrumb-store";
import Head from "next/head";
import { useEffect } from "react";

export default function BlogsCreate() {
  const { setBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Blogs",
      },
      {
        label: "Create",
        href: protectedPaths.blogs.create,
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
