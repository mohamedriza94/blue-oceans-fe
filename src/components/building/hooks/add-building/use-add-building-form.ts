import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useAlertModal } from "@/shared/components/alert-modal/use-alert-modal";
import { useAddBuildingApi } from "./use-add-building-api";
import { useQueryClient } from "@tanstack/react-query";

export type TBuildingPayload = {
  buildingName: string;
  telephone: string;
  address: string;
  parkingSlots: number;
  chargePerExtraParkingSlotInUSD: number;
};

export const ZOD_buildingSchema: z.ZodType<TBuildingPayload> = z.object({
  buildingName: z.string().min(1, "Building name is required"),
  telephone: z.string().regex(/^\d{10,15}$/, "Invalid telephone number"),
  address: z.string().min(1, "Address is required"),
  parkingSlots: z.number().min(0, "Parking slots must be 0 or more"),
  chargePerExtraParkingSlotInUSD: z
    .number()
    .min(0, "Charge per extra parking slot must be at least 0"),
});

export type FormValues = z.infer<typeof ZOD_buildingSchema>;

export const useAddBuildingForm = () => {
  const queryClient = useQueryClient();
  const { mutate, ...addBuildingApiData } = useAddBuildingApi();
  const showAlert = useAlertModal();

  const form = useForm<TBuildingPayload>({
    initialValues: {
      buildingName: "",
      telephone: "",
      address: "",
      parkingSlots: 0,
      chargePerExtraParkingSlotInUSD: 0,
    },
    validate: zodResolver(ZOD_buildingSchema),
  });

  const handleSubmit = (values: FormValues) => {
    mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["buildings-list"] });
        form.reset();

        showAlert({
          type: "success",
          defaultChildrenTexts: {
            headerText: "Building Created",
          },
          showCloseButton: false,
        });
      },
    });
  };

  return { form, handleSubmit, ...addBuildingApiData };
};
