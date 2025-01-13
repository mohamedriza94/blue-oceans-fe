import { z } from "zod";
import { useAlertModal } from "@/shared/components/alert-modal/use-alert-modal";
import { useForm, zodResolver } from "@mantine/form";
import { useFileUpload } from "@/shared/hooks/file-upload/use-file-upload";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAddChiefOccupantApi } from "./use-add-chief-occupant-api";

export type TChiefOccupantAddPayload = {
  apartmentId: string;
  image: string | null;
  fullName: string;
  contactNumber: string;
  email: string;
  moveInDate?: Date;
  status?: "Active" | "Inactive";
};

export const chiefOccupantStatus = ["Active", "Inactive"];

export const ZOD_chiefOccupantSchema: z.ZodType<
  Partial<TChiefOccupantAddPayload>
> = z.object({
  apartmentId: z.string().nonempty("Apartment is required"),
  fullName: z.string().min(1, "Full name is required"),
  contactNumber: z.string().regex(/^\d{10,15}$/, "Invalid contact number"),
  email: z.string().email("Invalid email address"),
  status: z.enum(["Active", "Inactive"]).optional(),
});

export type FormValues = z.infer<typeof ZOD_chiefOccupantSchema>;

export const useAddChiefOccupantForm = () => {
  const { handleUpload, uploading } = useFileUpload({
    maxFileSizeInMB: 3,
  });
  const queryClient = useQueryClient();
  const { mutate, ...addChiefOccupantApiData } = useAddChiefOccupantApi();
  const showAlert = useAlertModal();

  const form = useForm<TChiefOccupantAddPayload>({
    initialValues: {
      apartmentId: "",
      image: null,
      fullName: "",
      contactNumber: "",
      email: "",
      status: "Active",
    },
    validate: zodResolver(ZOD_chiefOccupantSchema),
  });

  // Start: Upload Image
  const [file, setFile] = useState<File | null>(null);
  const handleAvatarUpload = async () =>
    file ? (await handleUpload([file]))?.[0] || null : null;
  // End: Upload Image

  const handleSubmit = async (values: FormValues) => {
    const image = await handleAvatarUpload();
    mutate(
      { ...values, image },
      {
        onSuccess: () => {
          form.reset();
          setFile(null);

          queryClient.invalidateQueries({ queryKey: ["chief-occupants-list"] });

          showAlert({
            type: "success",
            defaultChildrenTexts: {
              headerText: "Created",
              subtext: "Chief Occupant created and Password has been mailed",
            },
            showCloseButton: false,
          });
        },
      },
    );
  };

  return {
    form,
    handleSubmit,
    ...addChiefOccupantApiData,
    uploading,
    file,
    setFile,
  };
};
