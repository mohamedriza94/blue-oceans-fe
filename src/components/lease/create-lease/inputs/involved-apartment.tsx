import { useGetOneApartment } from "@/components/apartment/hooks/use-read-one-apartment-api";
import { showDefaultImage } from "@/shared/utils/show-default-image";
import {
  Fieldset,
  Flex,
  Grid,
  Image,
  Loader,
  Stack,
  Text,
} from "@mantine/core";
import { useEffect } from "react";

type TProps = {
  apartmentId: string;
};

export const InvolvedApartment = ({ apartmentId }: TProps) => {
  const { data, isPending } = useGetOneApartment(apartmentId);

  return (
    <Fieldset legend="Occupant's Apartment">
      {apartmentId && isPending ? (
        <Flex align={"center"} justify={"center"} p={"xl"}>
          <Loader />
        </Flex>
      ) : data?.data?.data ? (
        <Grid gutter={"xs"}>
          <Grid.Col span={12}>
            <Flex align={"center"} gap={"sm"} justify={"center"}>
              <Image
                src={showDefaultImage(data?.data?.data?.images ?? [])}
                maw={100}
                mah={100}
                radius={"sm"}
              />

              <Stack align="stretch" flex={1}>
                <Flex align={"center"} justify={"space-between"}>
                  <Text fw={600} c={"blue.5"}>
                    Building
                  </Text>
                  <Text fw={400} c={"gray.8"}>
                    {data?.data?.data.buildingId.buildingName}
                  </Text>
                </Flex>
                <Flex align={"center"} justify={"space-between"}>
                  <Text fw={600} c={"blue.5"}>
                    Apartment
                  </Text>
                  <Text fw={400} c={"gray.8"}>
                    {data?.data?.data.identification}
                  </Text>
                </Flex>
              </Stack>
            </Flex>
          </Grid.Col>
        </Grid>
      ) : (
        <Flex>NA</Flex>
      )}
    </Fieldset>
  );
};
