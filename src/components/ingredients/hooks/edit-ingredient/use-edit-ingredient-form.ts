import { z } from "zod";
import { ZOD_ingredientSchema } from "../common/zod-schema";
import { useAlertModal } from "@/shared/components/alert-modal/use-alert-modal";
import { useEditIngredientApi } from "./use-edit-ingredient-api";
import { TIngredient } from "../../types/ingredient";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect } from "react";
import { useCloudinaryCustomBulkUpload } from "@/shared/hooks/cloudinary/use-cloudinary-custom-bulk-upload";
import { useImageManager } from "@/shared/hooks/use-image-manager";
import { TImage } from "@/shared/types/image";
import { useQueryClient } from "@tanstack/react-query";
import { getOneIngredientQueryOptions } from "../use-get-one-ingredient-api";

export type FormValues = z.infer<typeof ZOD_ingredientSchema>;

export type TIngredientUpdate = {
  deletedFiles?: TImage[];
} & TIngredient;

export const useEditIngredientForm = (
  ingredient: TIngredientUpdate | undefined | null,
) => {
  const showAlert = useAlertModal();
  const { mutate, ...editIngredientApi } = useEditIngredientApi();
  const { syncImagesToFileImages, setAllFiles, allFiles, deletedFiles } =
    useImageManager();
  const { handleUpload, uploading } = useCloudinaryCustomBulkUpload();
  const queryClient = useQueryClient();

  const defaultValues: TIngredientUpdate = {
    _id: ingredient?._id ?? "",
    name: ingredient?.name ?? "",
    shortDescription: ingredient?.shortDescription ?? "",
    description: ingredient?.description ?? "",
    nutritionalInfo: ingredient?.nutritionalInfo ?? [],
    images: [],
    seo: {
      title: ingredient?.seo?.title ?? "",
      keywords: ingredient?.seo?.keywords ?? [],
    },
    isActive: ingredient?.isActive ?? true,
    deletedFiles: [],
  };

  const form = useForm<TIngredientUpdate>({
    initialValues: defaultValues,
    validate: zodResolver(ZOD_ingredientSchema),
  });

  // Start : Handle Images
  useEffect(() => {
    if (ingredient?.images?.length == 0) return;

    (async () => {
      await syncImagesToFileImages(ingredient?.images ?? []);
    })();
  }, [ingredient?.images]);
  // End : Handle Images

  const handleSubmit = async (values: FormValues) => {
    const uploadedFiles = await handleUpload(allFiles, setAllFiles);

    mutate(
      { ...values, images: uploadedFiles, deletedFiles },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["ingredients-list"] });
          queryClient.invalidateQueries({
            queryKey: getOneIngredientQueryOptions({ id: ingredient?._id })
              .queryKey,
          });
          resetForm();
          showAlert({
            type: "success",
            defaultChildrenTexts: {
              headerText: "Updated",
              subtext: "Ingredient Updated Successfully",
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
    ...editIngredientApi,
    isPending: editIngredientApi.isPending || uploading,
    resetForm,
    allFiles,
    setAllFiles,
  };
};
