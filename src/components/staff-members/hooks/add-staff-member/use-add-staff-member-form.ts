import { z } from "zod";
import { TStaffMember } from "../../types/staff-member";
import { useAddStaffMemberApi } from "./use-add-staff-member-api";
import { useAlertModal } from "@/shared/components/alert-modal/use-alert-modal";
import { useForm, zodResolver } from "@mantine/form";
import { useFileUpload } from "@/shared/hooks/file-upload/use-file-upload";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const ZOD_staffMemberCreateSchema: z.ZodType<Partial<TStaffMember>> =
  z.object({
    email: z.string().email().nonempty({ message: "Email is required" }),
    fullName: z
      .string()
      .max(100, { message: "Full name must be 100 characters or fewer" })
      .nonempty({ message: "Full name is required" }),
    status: z.string().nonempty({ message: "Status is required" }),
    roles: z.array(z.string()).nonempty({ message: "Select atleast one role" }),
  });

export type FormValues = z.infer<typeof ZOD_staffMemberCreateSchema>;

export const useAddStaffMemberForm = () => {
  const { handleUpload, uploading } = useFileUpload({
    maxFileSizeInMB: 3,
  });
  const queryClient = useQueryClient();
  const { mutate, ...addStaffMemberApiData } = useAddStaffMemberApi();
  const showAlert = useAlertModal();

  const form = useForm<TStaffMember>({
    initialValues: {
      _id: "",
      email: "",
      status: "",
      avatar: null,
      fullName: "",
      roles: [],
    },
    validate: zodResolver(ZOD_staffMemberCreateSchema),
  });

  // Start: Upload Avatar
  const [file, setFile] = useState<File | null>(null);
  const handleAvatarUpload = async () =>
    file ? (await handleUpload([file]))?.[0] || null : null;
  // End: Upload Avatar

  const handleSubmit = async (values: FormValues) => {
    const avatar = await handleAvatarUpload();
    mutate(
      { ...values, avatar },
      {
        onSuccess: () => {
          form.reset();
          setFile(null);

          queryClient.invalidateQueries({ queryKey: ["staff-members-list"] });

          showAlert({
            type: "success",
            defaultChildrenTexts: {
              headerText: "Created",
              subtext: "Staff Member created and Password has been mailed",
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
    ...addStaffMemberApiData,
    uploading,
    file,
    setFile,
  };
};
