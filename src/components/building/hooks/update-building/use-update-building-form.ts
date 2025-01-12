import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useAlertModal } from "@/shared/components/alert-modal/use-alert-modal";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateBuildingApi } from "./use-update-building-api";
import { TBuilding } from "../../table";

export type TBuildingWithoutParkingSlots = Omit<TBuilding, "parkingSlots">;

export const ZOD_buildingSchema: z.ZodType<TBuildingWithoutParkingSlots> =
  z.object({
    buildingName: z.string().min(1, "Building name is required"),
    telephone: z.string().regex(/^\d{10,15}$/, "Invalid telephone number"),
    address: z.string().min(1, "Address is required"),
  });

export type FormValues = z.infer<typeof ZOD_buildingSchema>;

export const useUpdateBuildingForm = (building: TBuilding) => {
  const queryClient = useQueryClient();
  const { mutate, ...updateBuildingApiData } = useUpdateBuildingApi();
  const showAlert = useAlertModal();

  const form = useForm<TBuildingWithoutParkingSlots>({
    initialValues: {
      buildingName: building.buildingName,
      telephone: building.telephone,
      address: building.address,
    },
    validate: zodResolver(ZOD_buildingSchema),
  });

  const handleSubmit = (values: FormValues) => {
    mutate(
      { ...values, _id: building._id ?? "" },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["buildings-list"] });
          form.reset();

          showAlert({
            type: "success",
            defaultChildrenTexts: {
              headerText: "Building Updated",
            },
            showCloseButton: false,
          });
        },
      },
    );
  };

  return { form, handleSubmit, ...updateBuildingApiData };
};
