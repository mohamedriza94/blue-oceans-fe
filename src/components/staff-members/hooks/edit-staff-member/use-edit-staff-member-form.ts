import { z } from "zod";
import { TStaffMember } from "../../types/staff-member";
import { useAlertModal } from "@/shared/components/alert-modal/use-alert-modal";
import { useFileUpload } from "@/shared/hooks/file-upload/use-file-upload";
import { useEditStaffMemberApi } from "./use-edit-staff-member-api";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect, useState } from "react";
import { getFileFromUrl } from "@/shared/hooks/get-file-from-url";

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

export const useEditStaffMemberForm = (member: TStaffMember) => {
  const { handleUpload, uploading } = useFileUpload({
    maxFileSizeInMB: 3,
  });
  const { mutate, ...editStaffMemberApiData } = useEditStaffMemberApi();
  const showAlert = useAlertModal();

  const form = useForm<Partial<TStaffMember>>({
    initialValues: {
      email: member.email,
      status: member.status,
      avatar: member.avatar,
      fullName: member.fullName,
      roles: member.roles,
    },
    validate: zodResolver(ZOD_staffMemberCreateSchema),
  });

  // Start: Handle Avatar
  const [file, setFile] = useState<File | null>(null);
  const [fetchedFile, setFetchedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchFile = async () => {
      if (member.avatar) {
        const fetched = await getFileFromUrl(member.avatar, "avatar");
        setFile(fetched);
        setFetchedFile(fetched);
      }
    };

    fetchFile();
  }, [member.avatar]);

  const handleAvatarUpload = async () => {
    if (file && fetchedFile && file === fetchedFile) {
      return member.avatar;
    }
    return file ? (await handleUpload([file]))?.[0] || "" : "";
  };
  // End: Handle Avatar

  const handleSubmit = async (values: FormValues) => {
    const avatar = await handleAvatarUpload();

    mutate(
      {
        staffMemberId: member._id,
        data: { ...values, avatar },
      },
      {
        onSuccess: () => {
          form.reset();

          showAlert({
            type: "success",
            defaultChildrenTexts: {
              headerText: "Updated",
              subtext: "Staff Member has been updated",
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
