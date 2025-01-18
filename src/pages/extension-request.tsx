import { ExtensionRequest } from "@/components/extension-request/extension-request";
import { protectedPaths } from "@/shared/constants/paths";
import useBreadcrumbStore from "@/shared/stores/breadcrumb-store";
import Head from "next/head";
import { useEffect } from "react";

export default function Lease() {
  const { setBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Extension Request",
        href: protectedPaths.extensionRequest.path,
      },
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Extension Request</title>
      </Head>
      <ExtensionRequest />
    </>
  );
}
