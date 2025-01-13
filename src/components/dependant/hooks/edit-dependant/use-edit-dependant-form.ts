import { z } from "zod";
import { useAlertModal } from "@/shared/components/alert-modal/use-alert-modal";
import { useFileUpload } from "@/shared/hooks/file-upload/use-file-upload";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect, useState } from "react";
import { getFileFromUrl } from "@/shared/hooks/get-file-from-url";
import { useQueryClient } from "@tanstack/react-query";
import { TDependentPayload, ZOD_dependentSchema } from "../add-dependant/use-add-dependant-form";
import { TDependant } from "../../table";
import { useUpdateDependantApi } from "./use-edit-dependant-api";

export type TDependantUpdate = {
  _id: string;
} & TDependentPayload;

export type FormValues = z.infer<typeof ZOD_dependentSchema>;

export const useEditDependantForm = (dependant: TDependant) => {
  const queryClient = useQueryClient();
  const { handleUpload, uploading } = useFileUpload({
    maxFileSizeInMB: 3,
  });
  const { mutate, ...editDependantApiData } = useUpdateDependantApi();
  const showAlert = useAlertModal();

  const form = useForm<Partial<TDependantUpdate>>({
    initialValues: {
      _id: dependant._id ?? "",
      chiefOccupantId: dependant.chiefOccupantId,
      fullName: dependant.fullName,
      image: dependant.image,
      relationship: dependant.relationship,
      contactNumber: dependant.contactNumber,
      email: dependant.email,
      dateOfBirth: new Date(dependant.dateOfBirth),
    },
    validate: zodResolver(ZOD_dependentSchema),
  });

  // Start: Handle Avatar
  const [file, setFile] = useState<File | null>(null);
  const [fetchedFile, setFetchedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchFile = async () => {
      if (dependant.image) {
        const fetched = await getFileFromUrl(dependant.image, "avatar");
        setFile(fetched);
        setFetchedFile(fetched);
      }
    };

    fetchFile();
  }, [dependant.image]);

  const handleAvatarUpload = async () => {
    if (file && fetchedFile && file === fetchedFile) {
      return dependant.image;
    }
    return file ? (await handleUpload([file]))?.[0] || "" : "";
  };
  // End: Handle Avatar

  const handleSubmit = async (values: FormValues) => {
    const image = await handleAvatarUpload();
    mutate(
      { ...values, image },
      {
        onSuccess: () => {
          form.reset();

          queryClient.invalidateQueries({ queryKey: ["dependants-list"] });

          showAlert({
            type: "success",
            defaultChildrenTexts: {
              headerText: "Updated",
              subtext: "Dependant has been updated",
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
    ...editDependantApiData,
    uploading,
    file,
    setFile,
  };
};
