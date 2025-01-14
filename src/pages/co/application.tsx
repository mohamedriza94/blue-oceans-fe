import { CoApplication } from "@/components/co/application";
import { protectedPaths } from "@/shared/constants/paths";
import useBreadcrumbStore from "@/shared/stores/breadcrumb-store";
import Head from "next/head";
import { useEffect } from "react";

export default function Application() {
  const { setBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Application",
        href: protectedPaths.co_application.path,
      },
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Application</title>
      </Head>
      <CoApplication />
    </>
  );
}
