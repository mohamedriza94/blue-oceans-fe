import { z } from "zod";
import { useAlertModal } from "@/shared/components/alert-modal/use-alert-modal";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect } from "react";
import { useCloudinaryCustomBulkUpload } from "@/shared/hooks/cloudinary/use-cloudinary-custom-bulk-upload";
import { useImageManager } from "@/shared/hooks/use-image-manager";
import { TImage } from "@/shared/types/image";
import { useQueryClient } from "@tanstack/react-query";
import { ZOD_apartmentSchema } from "../add-apartment/use-add-apartment-form";
import { useEditApartmentApi } from "./use-edit-apartment-api";
import { TApartment } from "../../table";

export type FormValues = z.infer<typeof ZOD_apartmentSchema>;

export type TApartmentUpdate = {
  _id: string;
  buildingId: string;
  telephone: string;
  images?: TImage[];
  description: string;
  identification: string;
  class: "Luxury" | "Standard" | "Studio" | "Penthouse" | "Duplex";
  status: "Available" | "Occupied" | "Maintenance";
  deletedFiles?: TImage[];
};

export const useEditApartmentForm = (
  apartment: TApartment | undefined | null,
) => {
  const showAlert = useAlertModal();
  const { mutate, ...editApartmentApi } = useEditApartmentApi();
  const { syncImagesToFileImages, setAllFiles, allFiles, deletedFiles } =
    useImageManager();
  const { handleUpload, uploading } = useCloudinaryCustomBulkUpload();
  const queryClient = useQueryClient();

  const defaultValues: TApartmentUpdate = {
    _id: apartment?._id ?? "",
    buildingId: apartment?.buildingId._id ?? "",
    telephone: apartment?.telephone ?? "",
    description: apartment?.description ?? "",
    images: apartment?.images ?? [],
    identification: apartment?.identification ?? "",
    class: apartment?.class ?? "Standard",
    status: apartment?.status ?? "Available",
    deletedFiles: [],
  };

  const form = useForm<TApartmentUpdate>({
    initialValues: defaultValues,
    validate: zodResolver(ZOD_apartmentSchema),
  });

  // Start : Handle Images
  useEffect(() => {
    if (apartment?.images?.length == 0) return;

    (async () => {
      await syncImagesToFileImages(apartment?.images ?? []);
    })();
  }, [apartment?.images]);
  // End : Handle Images

  const handleSubmit = async (values: FormValues) => {
    const uploadedFiles = await handleUpload(allFiles, setAllFiles);

    mutate(
      { ...values, images: uploadedFiles, deletedFiles },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["apartments-list"] });
          resetForm();
          showAlert({
            type: "success",
            defaultChildrenTexts: {
              headerText: "Updated",
              subtext: "Apartment Updated Successfully",
            },
            showCloseButton: false,
          });
        },
      },
    );
  };

  const resetForm = () => {
    form.reset();
  };

  return {
    form,
    handleSubmit,
    ...editApartmentApi,
    isPending: editApartmentApi.isPending || uploading,
    resetForm,
    allFiles,
    setAllFiles,
  };
};
