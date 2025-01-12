import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TStaffMember } from "../../types/staff-member";
import { notifications } from "@mantine/notifications";

const restoreStaffMemberPutFn = async (staffMemberId: TStaffMember["_id"]) => {
  const response = await axiosPrivate.put(
    `/staff-member/restore-account/${staffMemberId}`,
    {},
  );
  return response.data;
};

type useRestoreStaffMemberApiParams = {
  closeModal?: () => void;
};

export const useRestoreStaffMemberApi = ({
  closeModal,
}: useRestoreStaffMemberApiParams) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: restoreStaffMemberPutFn,
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-members-list"] });

      notifications.show({
        position: "top-center",
        message: "Restored",
        color: "green.4",
      });

      closeModal && closeModal();
    },
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios", { position: "top-right" });
    },
  });

  return mutation;
};
