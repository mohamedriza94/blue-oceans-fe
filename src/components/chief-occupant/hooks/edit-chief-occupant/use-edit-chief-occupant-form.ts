import { z } from "zod";
import { useAlertModal } from "@/shared/components/alert-modal/use-alert-modal";
import { useFileUpload } from "@/shared/hooks/file-upload/use-file-upload";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect, useState } from "react";
import { getFileFromUrl } from "@/shared/hooks/get-file-from-url";
import {
  TChiefOccupantAddPayload,
  ZOD_chiefOccupantSchema,
} from "../add-chief-occupant/use-add-chief-occupant-form";
import { useUpdateChiefOccupantApi } from "./use-edit-chief-occupant-api";
import { TChiefOccupant } from "../../table";
import { useQueryClient } from "@tanstack/react-query";

export type TChiefOccupantUpdate = {
  _id: string;
} & TChiefOccupantAddPayload;

export type FormValues = z.infer<typeof ZOD_chiefOccupantSchema>;

export const useEditChiefOccupantForm = (occupant: TChiefOccupant) => {
  const queryClient = useQueryClient();
  const { handleUpload, uploading } = useFileUpload({
    maxFileSizeInMB: 3,
  });
  const { mutate, ...editStaffMemberApiData } = useUpdateChiefOccupantApi();
  const showAlert = useAlertModal();

  const form = useForm<Partial<TChiefOccupantUpdate>>({
    initialValues: {
      _id: occupant._id ?? "",
      apartmentId: occupant.apartmentId._id ?? "",
      image: occupant.image ?? null,
      fullName: occupant.fullName ?? "",
      contactNumber: occupant.contactNumber ?? "",
      email: occupant.email ?? "",
      status: occupant.status ?? "Active",
    },
    validate: zodResolver(ZOD_chiefOccupantSchema),
  });

  // Start: Handle Avatar
  const [file, setFile] = useState<File | null>(null);
  const [fetchedFile, setFetchedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchFile = async () => {
      if (occupant.image) {
        const fetched = await getFileFromUrl(occupant.image, "avatar");
        setFile(fetched);
        setFetchedFile(fetched);
      }
    };

    fetchFile();
  }, [occupant.image]);

  const handleAvatarUpload = async () => {
    if (file && fetchedFile && file === fetchedFile) {
      return occupant.image;
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

          queryClient.invalidateQueries({ queryKey: ["chief-occupants-list"] });

          showAlert({
            type: "success",
            defaultChildrenTexts: {
              headerText: "Updated",
              subtext: "Chief Occupant has been updated",
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
    ...editStaffMemberApiData,
    uploading,
    file,
    setFile,
  };
};
