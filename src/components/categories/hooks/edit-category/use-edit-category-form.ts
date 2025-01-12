import { TImage } from "@/shared/types/image";
import { TCategory } from "../../types/category";
import { useAlertModal } from "@/shared/components/alert-modal/use-alert-modal";
import { useEditCategoryApi } from "./use-edit-category-api";
import { useImageManager } from "@/shared/hooks/use-image-manager";
import { useCloudinaryCustomBulkUpload } from "@/shared/hooks/cloudinary/use-cloudinary-custom-bulk-upload";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, zodResolver } from "@mantine/form";
import { ZOD_categorySchema } from "../common/zod-schema";
import { useEffect } from "react";
import { z } from "zod";
import { getOneCategoryQueryOptions } from "../use-get-one-category-api";

export type FormValues = z.infer<typeof ZOD_categorySchema>;

export type TCategoryUpdate = {
  deletedFiles?: TImage[];
} & TCategory;

export const useEditCategoryForm = (
  category: TCategoryUpdate | undefined | null,
) => {
  const showAlert = useAlertModal();
  const { mutate, ...editCategoryApi } = useEditCategoryApi();
  const { syncImagesToFileImages, setAllFiles, allFiles, deletedFiles } =
    useImageManager();
  const { handleUpload, uploading } = useCloudinaryCustomBulkUpload();
  const queryClient = useQueryClient();

  const defaultValues: TCategoryUpdate = {
    _id: category?._id ?? "",
    name: category?.name ?? "",
    shortDescription: category?.shortDescription ?? "",
    description: category?.description ?? "",
    isActive: category?.isActive ?? true,
    categoryHierarchy: category?.categoryHierarchy ?? "",
    parentCategoryID: category?.parentCategoryID ?? undefined,
    images: [],
    deletedFiles: [],
  };

  const form = useForm<TCategoryUpdate>({
    initialValues: defaultValues,
    validate: zodResolver(ZOD_categorySchema),
  });

  // Start : Handle Images
  useEffect(() => {
    if (category?.images?.length == 0) return;

    (async () => {
      await syncImagesToFileImages(category?.images ?? []);
    })();
  }, [category?.images]);
  // End : Handle Images

  const handleSubmit = async (values: FormValues) => {
    const uploadedFiles = await handleUpload(allFiles, setAllFiles);

    mutate(
      { ...values, images: uploadedFiles, deletedFiles },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["categories-list"] });
          queryClient.invalidateQueries({
            queryKey: getOneCategoryQueryOptions({ id: category?._id })
              .queryKey,
          });
          resetForm();
          showAlert({
            type: "success",
            defaultChildrenTexts: {
              headerText: "Updated",
              subtext: "Category Updated Successfully",
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
    ...editCategoryApi,
    isPending: editCategoryApi.isPending || uploading,
    resetForm,
    allFiles,
    setAllFiles,
  };
};
