import { StaffMembersComponent } from "@/components/staff-members";
import useBreadcrumbStore from "@/shared/stores/breadcrumb-store";
import Head from "next/head";
import { useEffect } from "react";

export default function StaffMembers() {
  const { setBreadcrumbs } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Staff Members",
      },
    ]);
  }, []);

  return (
    <>
      <Head>
        <title>Staff Members</title>
      </Head>
      <StaffMembersComponent />
    </>
  );
}
