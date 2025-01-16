import { useEffect } from "react";
import { useGetDetailsLease } from "./hooks/use-details-lease-api";
import { Divider, Paper, Stack, Tabs, Text } from "@mantine/core";
import { Receipt } from "@/components/lease/create-lease/receipt";
import { TLeaseAgreementData } from "@/components/lease/hooks/create-lease/lease-agreement";
import { LeaseList } from "./lease-list";

export const MyLeaseComponent = () => {
  const { data, isPending } = useGetDetailsLease();

  const leaseData: TLeaseAgreementData | undefined = data?.data.data;

  return (
    <Paper bg={"white"} p={"xs"}>
      <Tabs variant="pills" defaultValue="current-lease">
        <Tabs.List>
          <Tabs.Tab value="current-lease">Current Lease</Tabs.Tab>
          <Tabs.Tab value="all-my-leases">Lease History</Tabs.Tab>
        </Tabs.List>

        <Divider mt={"xs"} />

        <Tabs.Panel value="current-lease">
          <Paper bg={"white"}>
            {leaseData && !isPending && (
              <Receipt
                leaseData={leaseData}
                autoDownload={false}
                title="My Current Lease"
              />
            )}
          </Paper>
        </Tabs.Panel>

        <Tabs.Panel value="all-my-leases">
          <LeaseList />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
};
