import {
  Box,
  Divider,
  Flex,
  Loader,
  Paper,
  rem,
  Stack,
  Text,
} from "@mantine/core";
import {
  TDashboardCountData,
  useGetDashboardCount,
} from "./hooks/use-get-dashboard-count";
import { CountItem } from "./count-item";
import {
  TLeaseChartDataItem,
  useGetLoadLeasesForChart,
} from "./hooks/use-get-lease-data-for-chart";
import { BarChart } from "@mantine/charts";
import { currentYear } from "@/shared/constants/general";
import { useEffect } from "react";

export const DashboardComponent = () => {
  const { data, isLoading } = useGetDashboardCount();
  const { data: leaseChartDataUnprocessed } =
    useGetLoadLeasesForChart(currentYear);

  const counts: TDashboardCountData | null = data?.data.data ?? null;
  const leaseChartData: TLeaseChartDataItem[] | null =
    leaseChartDataUnprocessed?.data.data ?? null;

  if (isLoading) {
    return (
      <Stack
        align="center"
        justify="center"
        flex={1}
        bg={"white"}
        style={{ borderRadius: rem(10) }}
      >
        <Loader />
      </Stack>
    );
  }

  if (!counts) {
    return (
      <Stack
        align="center"
        justify="center"
        flex={1}
        bg={"white"}
        style={{ borderRadius: rem(10) }}
      >
        <Text c={"amaranthRed"} fw={600} size="xl">
          Sorry. Could not load data
        </Text>
      </Stack>
    );
  }

  return (
    <Stack
      align="stretch"
      justify="flex-start"
      flex={1}
      style={{ borderRadius: rem(10) }}
    >
      <Flex align="stretch" wrap={"wrap"} gap={"xs"} justify={"space-between"}>
        <Box miw={"350px"} flex={1}>
          <Paper bg={"white"} p={"xs"} h={"100%"}>
            <Text fw={600} c={"gray.6"} size="md" mb={"xl"}>
              Buildings
            </Text>

            <Text fw={700} size="xl" c={"blue.5"}>
              {counts.buildings.total}
            </Text>
          </Paper>
        </Box>

        <Box miw={"350px"} flex={1}>
          <Paper bg={"white"} p={"xs"}>
            <Text fw={600} c={"gray.6"} size="md" mb={"xs"}>
              Apartments
            </Text>

            <Stack align="stretch" gap={"xs"}>
              <CountItem
                count={counts.apartments.available}
                label="Available"
              />
              <CountItem
                count={counts.apartments.maintenance}
                label="Maintenance"
              />
              <CountItem count={counts.apartments.occupied} label="Occupied" />
              <Divider />
              <CountItem count={counts.apartments.total} label="Total" />
            </Stack>
          </Paper>
        </Box>

        <Box miw={"350px"} flex={1}>
          <Paper bg={"white"} p={"xs"} h={"100%"}>
            <Text fw={600} c={"gray.6"} size="md" mb={"xs"}>
              Chief Occupants
            </Text>

            <Stack align="stretch" gap={"xs"}>
              <CountItem count={counts.chiefOccupants.active} label="Active" />
              <CountItem
                count={counts.chiefOccupants.inactive}
                label="Inactive"
              />
              <Divider />
              <CountItem count={counts.chiefOccupants.total} label="Total" />
            </Stack>
          </Paper>
        </Box>

        <Box miw={"350px"} flex={1}>
          <Paper bg={"white"} p={"xs"}>
            <Text fw={600} c={"gray.6"} size="md" mb={"xs"}>
              Leases
            </Text>

            <Stack align="stretch" gap={"xs"}>
              <CountItem count={counts.leases.active} label="Active" />
              <CountItem count={counts.leases.expired} label="Expired" />
              <CountItem count={counts.leases.terminated} label="Terminated" />
              <Divider />
              <CountItem count={counts.leases.total} label="Total" />
            </Stack>
          </Paper>
        </Box>

        <Box miw={"350px"} flex={1}>
          <Paper bg={"white"} p={"xs"}>
            <Text fw={600} c={"gray.6"} size="md" mb={"xs"}>
              Extension Requests
            </Text>

            <Stack align="stretch" gap={"xs"}>
              <CountItem
                count={counts.extensionRequests.pending}
                label="Pending"
              />
              <CountItem
                count={counts.extensionRequests.approved}
                label="Approved"
              />
              <CountItem
                count={counts.extensionRequests.rejected}
                label="Rejected"
              />
              <Divider />
              <CountItem count={counts.extensionRequests.total} label="Total" />
            </Stack>
          </Paper>
        </Box>
      </Flex>

      {leaseChartData && (
        <Paper p={"xs"}>
          <Stack gap={"md"} align="center">
            <Text fw={600} c={"blue.6"} size="xl">
              Lease Agreements starting in {currentYear}
            </Text>
            <BarChart
              h={300}
              data={leaseChartData}
              dataKey="month"
              series={[{ name: "leases", color: "green.6" }]}
              tickLine="y"
            />
          </Stack>
        </Paper>
      )}
    </Stack>
  );
};
