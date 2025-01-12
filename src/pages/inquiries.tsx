import { InquiriesComponent } from "@/components/inquiries";
import { protectedPaths } from "@/shared/constants/paths";
import useBreadcrumbStore from "@/shared/stores/breadcrumb-store";
import Head from "next/head";
import { useEffect } from "react";

export default function Inquiries() {
  const { setBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Inquiries",
        href: protectedPaths.inquiries,
      },
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Inquiries</title>
      </Head>
      <InquiriesComponent />
    </>
  );
}
