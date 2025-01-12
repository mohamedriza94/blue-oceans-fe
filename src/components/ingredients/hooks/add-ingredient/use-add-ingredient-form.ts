import { useAlertModal } from "@/shared/components/alert-modal/use-alert-modal";
import { useAddIngredientApi } from "./use-add-ingredient-api";
import { TIngredient } from "../../types/ingredient";
import { useForm, zodResolver } from "@mantine/form";
import { ZOD_ingredientSchema } from "../common/zod-schema";
import { z } from "zod";
import { CustomFile } from "@/shared/components/custom-dropzone/types";
import { useState } from "react";
import { useCloudinaryCustomBulkUpload } from "@/shared/hooks/cloudinary/use-cloudinary-custom-bulk-upload";

export type FormValues = z.infer<typeof ZOD_ingredientSchema>;

export const useAddIngredientForm = () => {
  const showAlert = useAlertModal();
  const { mutate, ...addIngredientApi } = useAddIngredientApi();
  const { handleUpload, uploading } = useCloudinaryCustomBulkUpload();

  const [files, setFiles] = useState<CustomFile[]>([]);

  const initialValues: TIngredient = {
    name: "",
    shortDescription: "",
    description: "",
    nutritionalInfo: [],
    images: [],
    seo: {
      title: "",
      keywords: [],
    },
    isActive: true,
  };

  const form = useForm<TIngredient>({
    initialValues,
    validate: zodResolver(ZOD_ingredientSchema),
  });

  const handleSubmit = async (values: FormValues) => {
    const uploadedFiles = await handleUpload(files, setFiles);

    mutate(
      { ...values, images: uploadedFiles },
      {
        onSuccess: () => {
          resetForm();

          showAlert({
            type: "success",
            defaultChildrenTexts: {
              headerText: "Created",
              subtext: "Ingredient Created Successfully",
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
    files,
    setFiles,
    resetForm,
    ...addIngredientApi,
    isPending: uploading || addIngredientApi.isPending,
  };
};
