import {
  Divider,
  Flex,
  Loader,
  Paper,
  rem,
  Stack,
  TextInput,
} from "@mantine/core";
import { useGetMyDashboard } from "./hooks/use-dashboard-details-api";
import dateFormat from "dateformat";
import { Text } from "@mantine/core";
import { CountItem } from "@/components/dsahboard/count-item";
import React from "react";

export const CoDashboardComponent = () => {
  const { data, isLoading } = useGetMyDashboard();

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

  return (
    <Stack
      align="stretch"
      justify="flex-start"
      flex={1}
      style={{ borderRadius: rem(10) }}
    >
      {data?.upcomingRentPayment && (
        <Paper bg={"white"} p={"xs"}>
          <Text c={"amaranthRed.5"} fw={600}>
            Upcoming Rent Payment
          </Text>
          <Divider my={"xs"} />
          <Stack align="stretch">
            <CountItem
              label="Due by"
              count={dateFormat(
                data.upcomingRentPayment.dueDate,
                "mmm d, yyyy",
              )}
            />
            <CountItem
              label="Payment Status"
              count={data.upcomingRentPayment.paymentStatus}
            />
            <CountItem
              label="Amount Payable"
              count={`$${data.upcomingRentPayment.amount}`}
            />
          </Stack>
        </Paper>
      )}

      {data.rentOverdues && data.rentOverdues.length > 0 && (
        <Paper bg={"white"} p={"xs"}>
          <Text c={"amaranthRed.5"} fw={600}>
            Rent Overdues
          </Text>
          <Divider my={"xs"} />

          <Stack align="stretch">
            {data.rentOverdues.map((item: any, idx: number) => {
              const dueDate = new Date(item.dueDate);
              const currentDate = new Date();

              // Calculate overdue days
              const overdueDays = Math.max(
                Math.floor(
                  (currentDate.getTime() - dueDate.getTime()) /
                    (1000 * 60 * 60 * 24),
                ),
                0,
              );

              return (
                <React.Fragment key={idx}>
                  <CountItem
                    label={dateFormat(item.dueDate, "mmm d, yyyy")}
                    count={`${overdueDays} days overdue`}
                  />
                </React.Fragment>
              );
            })}
          </Stack>
        </Paper>
      )}

      {data.currentLease && (
        <Paper bg={"white"} p={"xs"}>
          <Text c={"blue.5"} fw={600}>
            My Lease
          </Text>
          <Divider my={"xs"} />
          <Flex wrap={"wrap"} gap={"xs"} align={"center"}>
            <TextInput
              label="Start Date"
              value={dateFormat(data.currentLease.startDate, "mmm d, yyyy")}
            />
            <TextInput
              label="End Date"
              value={dateFormat(data.currentLease.endDate, "mmm d, yyyy")}
            />
            <TextInput
              label="Signed On"
              value={dateFormat(data.currentLease.createdAt, "mmm d, yyyy")}
            />
            <TextInput label="Parking Slots" value={data.parkingSlots.length} />
            <TextInput
              label="Apartment"
              flex={1}
              value={data.currentApartment.identification}
            />
            <TextInput
              label="Building"
              value={data.currentBuilding.buildingName}
            />
            <TextInput label="Hotline" value={data.currentBuilding.telephone} />
            <TextInput
              flex={1}
              label="Address"
              value={data.currentBuilding.address}
            />
          </Flex>
        </Paper>
      )}

      {data.pendingExtensionRequest && (
        <Paper bg={"white"} p={"xs"}>
          <Text c={"blue.5"} fw={600}>
            Lease Extension Request
          </Text>
          <Divider my={"xs"} />
          <Flex wrap={"wrap"} gap={"xs"} align={"center"}>
            <TextInput
              flex={1}
              label="Requested At"
              value={dateFormat(
                data.pendingExtensionRequest.requestedAt,
                "mmm d, yyyy",
              )}
            />
            <TextInput
              flex={1}
              label="Extend Upto"
              value={dateFormat(
                data.pendingExtensionRequest.requestedEndDate,
                "mmm d, yyyy",
              )}
            />
            <TextInput
              flex={1}
              label="Status"
              value={data.pendingExtensionRequest.status}
            />
          </Flex>
        </Paper>
      )}
    </Stack>
  );
};
