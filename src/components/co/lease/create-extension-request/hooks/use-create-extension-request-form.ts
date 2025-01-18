import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useAlertModal } from "@/shared/components/alert-modal/use-alert-modal";
import { useQueryClient } from "@tanstack/react-query";
import {
  TExtensionRequest,
  useCreateExtensionRequestApi,
} from "./use-create-extension-request-api";
import { TLeaseAgreementData } from "@/components/lease/hooks/create-lease/lease-agreement";

export const ZOD_extensionRequestSchema: z.ZodType<TExtensionRequest> =
  z.object({
    requestedEndDate: z.date(),
    reason: z.string().nonempty("Reason is required."),
  });

export type FormValues = z.infer<typeof ZOD_extensionRequestSchema>;

export const useCreateExtensionRequestForm = (
  leaseData: TLeaseAgreementData,
) => {
  const queryClient = useQueryClient();
  const { mutate, ...createExtensionRequestApi } =
    useCreateExtensionRequestApi();
  const showAlert = useAlertModal();

  const leaseEndDate = leaseData.lease.endDate
    ? new Date(leaseData.lease.endDate)
    : new Date();

  // Add one month to the lease end date
  const leaseEndPlusOneMonth = new Date(leaseEndDate);
  leaseEndPlusOneMonth.setMonth(leaseEndPlusOneMonth.getMonth() + 1);

  const form = useForm<TExtensionRequest>({
    initialValues: {
      requestedEndDate: leaseEndPlusOneMonth,
      reason: "",
    },
    validate: zodResolver(ZOD_extensionRequestSchema),
  });

  const handleSubmit = (values: FormValues) => {
    mutate({...values, leaseId: leaseData.lease._id}, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["read-detailed-occupant-lease"],
        });
        form.reset();

        showAlert({
          type: "success",
          defaultChildrenTexts: {
            headerText: "Extension Request Created",
          },
          showCloseButton: false,
        });
      },
    });
  };

  return {
    form,
    handleSubmit,
    ...createExtensionRequestApi,
    leaseEndPlusOneMonth,
    leaseEndDate,
  };
};
