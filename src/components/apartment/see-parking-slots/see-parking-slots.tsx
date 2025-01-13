import {
  Badge,
  Box,
  Flex,
  Paper,
  rem,
  ScrollAreaAutosize,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import {
  TParkingSlot,
  useGetParkingSlotsOfBuilding,
} from "../hooks/use-see-parking-slots-api";
import { TBuilding } from "../table";
import { createEmptyArray } from "@/shared/utils/create-empty-array";

type TProps = {
  buildingId: TBuilding["_id"];
};

export const SeeParkingSlots = ({ buildingId }: TProps) => {
  const { data, isPending } = useGetParkingSlotsOfBuilding(buildingId);

  const getSlotColor = (slotStatus: TParkingSlot["status"]) => {
    switch (slotStatus) {
      case "Available":
        return "green.5";
      case "Occupied":
        return "amaranthRed.5";
    }
  };

  return (
    <Stack gap={"xs"} align="stretch" justify="flex-start">
      <Flex align="center" gap={"xl"}>
        <Flex align="center" gap={"xs"}>
          <ThemeIcon radius="xl" size={10} color="green.5" />
          <Text size="sm">Available</Text>
        </Flex>
        <Flex align="center" gap={"xs"}>
          <ThemeIcon radius="xl" size={10} color="amaranthRed.5" />
          <Text size="sm">Occupied</Text>
        </Flex>
      </Flex>

      <Paper radius={"md"} p={"md"}>
        <ScrollAreaAutosize mah={200} offsetScrollbars type="always">
          <SimpleGrid cols={4}>
            {isPending
              ? createEmptyArray(12).map((_, idx) => (
                  <Skeleton
                    radius="md"
                    p={"sm"}
                    key={idx + "parking-slot-for-building-skeleton"}
                  ></Skeleton>
                ))
              : data &&
                data.map((item, idx) => (
                  <Badge
                    variant="filled"
                    style={{
                      borderRadius: rem(10),
                    }}
                    bg={getSlotColor(item.status)}
                    p={"sm"}
                    key={idx + "parking-slot-for-building"}
                  >
                    {item.slotNumber}
                  </Badge>
                ))}
          </SimpleGrid>
        </ScrollAreaAutosize>
      </Paper>
    </Stack>
  );
};
