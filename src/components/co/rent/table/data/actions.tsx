import { TRent } from "@/components/lease/hooks/use-read-rents-of-lease-api";
import { PayRentModal } from "@/components/pay-rent/pay-rent-modal";

type TProps = {
  rent?: TRent;
};

export const TdActions = ({ rent }: TProps) => {
  // const { isPending, handleSubmit, form } = usePayRentForm();
  // useEffect(() => {
  //   form.setFieldValue("rentId", rentId ?? "");
  // }, [rentId]);

  return <>{rent && <PayRentModal rent={rent} />}</>;
};
