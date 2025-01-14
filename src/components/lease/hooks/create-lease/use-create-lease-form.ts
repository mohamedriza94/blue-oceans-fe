import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useAlertModal } from "@/shared/components/alert-modal/use-alert-modal";
import { useQueryClient } from "@tanstack/react-query";
import { TImage } from "@/shared/types/image";
import { CustomFile } from "@/shared/components/custom-dropzone/types";
import { useState } from "react";
import { useCloudinaryCustomBulkUpload } from "@/shared/hooks/cloudinary/use-cloudinary-custom-bulk-upload";
import { aborted } from "util";
import {
  ENUMLeaseStatus,
  ENUMPaymentSchedule,
  TLeasePayload,
  useCreateLeaseApi,
} from "./use-create-lease-api";

export const ZOD_leaseSchema: z.ZodType<Partial<TLeasePayload>> = z.object({
  apartmentId: z.string().nonempty("Apartment ID is required"),
  chiefOccupantId: z.string().nonempty("Chief Occupant ID is required"),
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date({ required_error: "End date is required" }),
  rentAmountInUSD: z.number().min(1, "Rent amount must be greater than 0"),
  paymentSchedule: z.nativeEnum(ENUMPaymentSchedule, {
    invalid_type_error: "Invalid payment schedule",
  }),
  securityDepositInUSD: z
    .number()
    .min(0, "Security deposit must be at least 0"),
  termsAndConditions: z.string().min(1, "Terms and conditions are required"),
});

export type FormValues = z.infer<typeof ZOD_leaseSchema>;

export const useCreateLeaseForm = () => {
  const queryClient = useQueryClient();
  const { mutate, ...createLeaseApiData } = useCreateLeaseApi();
  const { handleUpload, uploading } = useCloudinaryCustomBulkUpload();

  const [files, setFiles] = useState<CustomFile[]>([]);

  const showAlert = useAlertModal();

  const form = useForm<TLeasePayload>({
    initialValues: {
      apartmentId: "",
      chiefOccupantId: "",
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 12)),
      rentAmountInUSD: 0,
      paymentSchedule: ENUMPaymentSchedule.Monthly,
      status: ENUMLeaseStatus.Active,
      securityDepositInUSD: 0,
      termsAndConditions: "",
      documentURLs: [],
    },
    validate: zodResolver(ZOD_leaseSchema),
  });

  const handleSubmit = async (values: FormValues) => {
    const uploadedFiles = await handleUpload(files, setFiles);

    mutate(
      { ...values, documentURLs: uploadedFiles },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["lease-list"] });
          // form.reset();

          showAlert({
            type: "success",
            defaultChildrenTexts: {
              headerText: "Lease Created",
            },
            showCloseButton: false,
          });
        },
      },
    );
  };

  const resetForm = () => {
    form.reset();
    setFiles([]);
  };

  return {
    form,
    handleSubmit,
    resetForm,
    ...createLeaseApiData,
    files,
    setFiles,
    isPending: uploading || createLeaseApiData.isPending,
  };
};
aborted;
