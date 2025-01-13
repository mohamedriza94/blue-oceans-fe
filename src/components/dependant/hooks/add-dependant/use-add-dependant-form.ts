import { z } from "zod";
import { useAlertModal } from "@/shared/components/alert-modal/use-alert-modal";
import { useForm, zodResolver } from "@mantine/form";
import { useFileUpload } from "@/shared/hooks/file-upload/use-file-upload";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAddDependantApi } from "./use-add-dependant-api";
import { TChiefOccupant } from "@/components/chief-occupant/table";

export type TDependentPayload = {
  chiefOccupantId: string;
  fullName: string;
  image: string | null;
  relationship: string;
  contactNumber?: string;
  email?: string;
  dateOfBirth: Date;
};

export const ZOD_dependentSchema: z.ZodType<Partial<TDependentPayload>> =
  z.object({
    chiefOccupantId: z.string().nonempty("Chief Occupant ID is required"),
    fullName: z.string().min(1, "Full name is required"),
    relationship: z.string().min(1, "Relationship is required"),
    dateOfBirth: z.date({
      invalid_type_error: "Date of Birth must be a valid date",
    }),
  });

export type FormValues = z.infer<typeof ZOD_dependentSchema>;

export const useAddDependantForm = (occupant: TChiefOccupant) => {
  const { handleUpload, uploading } = useFileUpload({
    maxFileSizeInMB: 3,
  });
  const queryClient = useQueryClient();
  const { mutate, ...addDependantApiData } = useAddDependantApi();
  const showAlert = useAlertModal();

  const form = useForm<TDependentPayload>({
    initialValues: {
      chiefOccupantId: occupant._id,
      fullName: "",
      image: "",
      relationship: "",
      contactNumber: "",
      email: "",
      dateOfBirth: new Date(),
    },
    validate: zodResolver(ZOD_dependentSchema),
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
          queryClient.invalidateQueries({ queryKey: ["dependants-list"] });

          showAlert({
            type: "success",
            defaultChildrenTexts: {
              headerText: "Created",
              subtext: "Dependant created",
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
    ...addDependantApiData,
    uploading,
    file,
    setFile,
  };
};
