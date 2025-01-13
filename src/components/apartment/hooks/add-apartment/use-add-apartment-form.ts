import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useAlertModal } from "@/shared/components/alert-modal/use-alert-modal";
import { useAddApartmentApi } from "./use-add-apartment-api";
import { useQueryClient } from "@tanstack/react-query";
import { TImage } from "@/shared/types/image";
import { CustomFile } from "@/shared/components/custom-dropzone/types";
import { useState } from "react";
import { useCloudinaryCustomBulkUpload } from "@/shared/hooks/cloudinary/use-cloudinary-custom-bulk-upload";
import { aborted } from "util";

export interface TApartmentPayload {
  buildingId: string;
  telephone: string;
  images?: TImage[];
  description: string;
  identification: string;
  class: "Luxury" | "Standard" | "Studio" | "Penthouse" | "Duplex";
  status: "Available" | "Occupied" | "Maintenance";
}

export const apartmentClasses = [
  "Luxury",
  "Standard",
  "Studio",
  "Penthouse",
  "Duplex",
];
export const apartmentStatuses = ["Available", "Maintenance"];

export const ZOD_apartmentSchema: z.ZodType<TApartmentPayload> = z.object({
  buildingId: z.string().nonempty("Building ID is required"),
  telephone: z.string().regex(/^\d{10,15}$/, "Invalid telephone number"),
  description: z.string().min(1, "Description is required"),
  identification: z.string().min(1, "Identification is required"),
  class: z.enum(["Luxury", "Standard", "Studio", "Penthouse", "Duplex"]),
  status: z.enum(["Available", "Occupied", "Maintenance"]),
});
export type FormValues = z.infer<typeof ZOD_apartmentSchema>;

export const useAddBuildingForm = () => {
  const queryClient = useQueryClient();
  const { mutate, ...addApartmentApiData } = useAddApartmentApi();
  const { handleUpload, uploading } = useCloudinaryCustomBulkUpload();

  const [files, setFiles] = useState<CustomFile[]>([]);

  const showAlert = useAlertModal();

  const form = useForm<TApartmentPayload>({
    initialValues: {
      buildingId: "",
      telephone: "",
      description: "",
      images: [],
      identification: "",
      class: "Standard",
      status: "Available",
    },
    validate: zodResolver(ZOD_apartmentSchema),
  });

  const handleSubmit = async (values: FormValues) => {
    const uploadedFiles = await handleUpload(files, setFiles);

    mutate(
      { ...values, images: uploadedFiles },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["apartments-list"] });
          form.reset();

          showAlert({
            type: "success",
            defaultChildrenTexts: {
              headerText: "Building Created",
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
    ...addApartmentApiData,
    files,
    setFiles,
    isPending: uploading || addApartmentApiData.isPending,
  };
};
aborted;
