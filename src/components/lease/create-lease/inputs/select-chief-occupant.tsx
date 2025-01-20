import { useGetChiefOccupants } from "@/components/chief-occupant/hooks/use-read-chief-occupants-api";
import { TChiefOccupant } from "@/components/chief-occupant/table";
import { TdAvatar } from "@/components/chief-occupant/table/data/avatar";
import {
  Avatar,
  Button,
  Collapse,
  Divider,
  Flex,
  Loader,
  Paper,
  ScrollAreaAutosize,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { TLeasePayload } from "../../hooks/create-lease/use-create-lease-api";

type TProps = {
  form: UseFormReturnType<
    TLeasePayload,
    (values: TLeasePayload) => TLeasePayload
  >;
  isPending: boolean;
  setSelectedOccupant: (value: TChiefOccupant) => void;
};

export const SelectChiefOccupant = ({
  form,
  isPending,
  setSelectedOccupant,
}: TProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  const { applyFilters, data, isLoading } = useGetChiefOccupants(100);

  const handleSelectChiefOccupant = (occupant: TChiefOccupant) => {
    setSelectedOccupant(occupant);
    close();
    form.setFieldValue("apartmentId", occupant.apartmentId._id);
    form.setFieldValue("chiefOccupantId", occupant._id);
  };

  const renderSkeleton = () => (
    <Flex align={"center"} justify={"center"}>
      <Loader />
    </Flex>
  );

  return (
    <Stack align="stretch" gap={"xs"}>
      <TextInput
        label={"Select Chief Occupant"}
        disabled={isPending}
        placeholder="Enter chief occupant name"
        onChange={(e) => applyFilters({ fullName: e.target.value })}
        onFocus={open}
        // onBlur={close}
      />

      <Collapse in={opened}>
        <Divider mb={"xs"} />
        <ScrollAreaAutosize offsetScrollbars type="auto" mah={200}>
          {isLoading ? (
            renderSkeleton()
          ) : (
            <Stack align="stretch" gap={2}>
              {data?.data.data.chiefOccupants.map(
                (occ: TChiefOccupant, idx: number) => (
                  <Paper
                    radius={"md"}
                    p={"xs"}
                    bg={occ.status == "Active" ? "gray.2" : "amaranthRed.0"}
                  >
                    <Flex
                      align={"center"}
                      justify={"space-between"}
                      gap={"xs"}
                      key={idx + "chief-occupant-selector"}
                    >
                      <TdAvatar occupant={occ} />
                      <Text fw={600}>{occ.status}</Text>
                      <Button
                        p={"xs"}
                        disabled={isPending || occ.status !== "Active"}
                        onClick={() => handleSelectChiefOccupant(occ)}
                      >
                        Select
                      </Button>
                    </Flex>
                  </Paper>
                ),
              )}
            </Stack>
          )}
        </ScrollAreaAutosize>
      </Collapse>
    </Stack>
  );
};
