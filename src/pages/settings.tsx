import { SettingsComponent } from "@/components/settings";
import { protectedPaths } from "@/shared/constants/paths";
import useBreadcrumbStore from "@/shared/stores/breadcrumb-store";
import Head from "next/head";
import { useEffect } from "react";

export default function Settings() {
  const { setBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Settings",
        href: protectedPaths.settings,
      },
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <SettingsComponent />
    </>
  );
}
