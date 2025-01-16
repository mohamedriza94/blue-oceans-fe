import { usePayRentForm } from "@/components/lease/hooks/pay-rent/use-pay-rent-form";
import { Button } from "@mantine/core";
import { useEffect } from "react";

type TProps = {
  rentId?: string;
};

export const TdActions = ({ rentId }: TProps) => {
  const { isPending, handleSubmit, form } = usePayRentForm();
  useEffect(() => {
    form.setFieldValue("rentId", rentId ?? "");
  }, [rentId]);

  return (
    <>
      <Button
        size={"xs"}
        radius={"md"}
        disabled={isPending}
        loading={isPending}
        onClick={()=>handleSubmit(form.values)}
      >
        Pay
      </Button>
    </>
  );
};
