import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { PayRent } from "./pay-rent";
import { Button } from "@mantine/core";
import { TRent } from "../lease/hooks/use-read-rents-of-lease-api";

export const PayRentModal = ({ rent }: { rent: TRent }) => {
  return (
    <CustomMantineModal
      title={"Rent Payment"}
      styles={{
        title: {
          fontWeight: 600,
        },
      }}
      centered
      size={"md"}
      customTrigger={
        <Button size={"xs"} radius={"md"}>
          Pay
        </Button>
      }
    >
      <PayRent rent={rent} />
    </CustomMantineModal>
  );
};
