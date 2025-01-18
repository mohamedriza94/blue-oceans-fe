import { useGetDetailsLease } from "./hooks/use-details-lease-api";
import { Divider, Fieldset, Flex, Paper, Tabs, Text } from "@mantine/core";
import { Receipt } from "@/components/lease/create-lease/receipt";
import { TLeaseAgreementData } from "@/components/lease/hooks/create-lease/lease-agreement";
import { LeaseList } from "./lease-list";
import { CreateExtensionRequestModal } from "./create-extension-request/create-extension-request-modal";
import { ENUMExtRequest } from "./create-extension-request/hooks/use-create-extension-request-api";
import dateFormat from "dateformat";

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
          <Paper bg={"white"} py={"xs"}>
            {leaseData && <CreateExtensionRequestModal leaseData={leaseData} />}

            <Divider my={"sm"} />

            {leaseData?.extensionRequest?.status == ENUMExtRequest.Pending && (
              <Fieldset legend="Extension Request" p={"xs"}>
                <Flex align={"center"} justify={"space-between"}>
                  <Text size="sm" fw={600}>
                    Requested At
                  </Text>
                  <Text>
                    {dateFormat(
                      leaseData.extensionRequest.requestedAt,
                      "mmm d, yyyy",
                    )}
                  </Text>
                </Flex>

                <Flex align={"center"} justify={"space-between"}>
                  <Text size="sm" fw={600}>
                    Status
                  </Text>
                  <Text>{leaseData.extensionRequest.status}</Text>
                </Flex>

                <Flex align={"center"} justify={"space-between"}>
                  <Text size="sm" fw={600}>
                    Extend upto
                  </Text>
                  <Text>
                    {dateFormat(
                      leaseData.extensionRequest?.requestedEndDate,
                      "mmm d, yyyy",
                    )}
                  </Text>
                </Flex>
              </Fieldset>
            )}

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
