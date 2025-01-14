import { fieldsetStyles } from "@/components/common/form-fieldset-style";
import { Divider, Fieldset, Stack } from "@mantine/core";
import { SelectChiefOccupant } from "./select-chief-occupant";
import { TdAvatar } from "@/components/chief-occupant/table/data/avatar";
import { DependantTable } from "@/components/dependant/table";
import { InvolvedApartment } from "./involved-apartment";
import { TChiefOccupant } from "@/components/chief-occupant/table";
import { UseFormReturnType } from "@mantine/form";
import { TLeasePayload } from "../../hooks/create-lease/use-create-lease-api";

type TProps = {
  form: UseFormReturnType<
    TLeasePayload,
    (values: TLeasePayload) => TLeasePayload
  >;
  isPending: boolean;
  setSelectedOccupant: (value: TChiefOccupant) => void;
  selectedOccupant: TChiefOccupant | null;
};

export const ChiefOccupantAndApartment = ({
  form,
  isPending,
  setSelectedOccupant,
  selectedOccupant,
}: TProps) => {
  return (
    <Fieldset
      styles={fieldsetStyles}
      bg={"gray.0"}
      legend="Involved Chief Occupant and Apartment"
    >
      <Stack align="stretch">
        <SelectChiefOccupant
          form={form}
          isPending={isPending}
          setSelectedOccupant={setSelectedOccupant}
        />

        {selectedOccupant && (
          <>
            <Divider />
            <Fieldset legend="Selected Occupant">
              <Stack gap={"md"}>
                <TdAvatar occupant={selectedOccupant} />
                <Fieldset legend="Dependants" fw={600}>
                  <DependantTable occupantId={selectedOccupant._id} />
                </Fieldset>
              </Stack>
              <Divider my={"lg"} />
              <InvolvedApartment apartmentId={form.values.apartmentId} />
            </Fieldset>
          </>
        )}
      </Stack>
    </Fieldset>
  );
};
