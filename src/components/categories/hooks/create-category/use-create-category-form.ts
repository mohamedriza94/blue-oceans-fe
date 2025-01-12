import { useAlertModal } from "@/shared/components/alert-modal/use-alert-modal";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { CustomFile } from "@/shared/components/custom-dropzone/types";
import { useState } from "react";
import { useCloudinaryCustomBulkUpload } from "@/shared/hooks/cloudinary/use-cloudinary-custom-bulk-upload";
import { ZOD_categorySchema } from "../common/zod-schema";
import { useCreateCategoryApi } from "./use-create-category-api";
import { TCategory } from "../../types/category";
import { useQueryClient } from "@tanstack/react-query";

export type FormValues = z.infer<typeof ZOD_categorySchema>;

export const useCreateCategoryForm = () => {
  const queryClient = useQueryClient();
  const showAlert = useAlertModal();
  const { mutate, ...createCategoryApi } = useCreateCategoryApi();
  const { handleUpload, uploading } = useCloudinaryCustomBulkUpload();

  const [files, setFiles] = useState<CustomFile[]>([]);

  const initialValues: TCategory = {
    name: "",
    shortDescription: "",
    description: "",
    images: [],
    isActive: true,
  };

  const form = useForm<TCategory>({
    initialValues,
    validate: zodResolver(ZOD_categorySchema),
  });

  const handleSubmit = async (values: FormValues) => {
    const uploadedFiles = await handleUpload(files, setFiles);

    mutate(
      { ...values, images: uploadedFiles },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["category"] });
          queryClient.invalidateQueries({ queryKey: ["categories-list"] });
          resetForm();

          showAlert({
            type: "success",
            defaultChildrenTexts: {
              headerText: "Created",
              subtext: "Category Created Successfully",
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
    ...createCategoryApi,
    isPending: uploading || createCategoryApi.isPending,
  };
};
