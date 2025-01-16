import { useAlertModal } from "@/shared/components/alert-modal/use-alert-modal";
import { useForm } from "@mantine/form";
import { useCloudinaryCustomBulkUpload } from "@/shared/hooks/cloudinary/use-cloudinary-custom-bulk-upload";
import { useImageManager } from "@/shared/hooks/use-image-manager";
import { useQueryClient } from "@tanstack/react-query";
import { TPayRent, usePayRentApi } from "./use-pay-rent-api";

export const usePayRentForm = () => {
  const showAlert = useAlertModal();
  const { mutate, ...payRentApi } = usePayRentApi();
  const queryClient = useQueryClient();

  const defaultValues: TPayRent = {
    rentId: "",
    remarks: "",
  };

  const form = useForm<TPayRent>({
    initialValues: defaultValues,
  });

  const handleSubmit = async (values: TPayRent) => {
    mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["rents-of-lease"] });
        queryClient.invalidateQueries({ queryKey: ["ReadRentsForOccupant"] });
        resetForm();
        showAlert({
          type: "success",
          defaultChildrenTexts: {
            headerText: "Updated",
            subtext: "Rent Payment Successful",
          },
          showCloseButton: false,
        });
      },
    });
  };

  const resetForm = () => {
    form.reset();
  };

  return {
    form,
    handleSubmit,
    ...payRentApi,
  };
};
