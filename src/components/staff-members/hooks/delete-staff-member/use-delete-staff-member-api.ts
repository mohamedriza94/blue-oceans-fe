import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TStaffMember } from "../../types/staff-member";
import { notifications } from "@mantine/notifications";

const deleteStaffMemberPutFn = async (staffMemberId: TStaffMember["_id"]) => {
  const response = await axiosPrivate.put(
    `/staff-member/delete-account/${staffMemberId}`,
    { deletionType: "soft" },
  );
  return response.data;
};

type useDeleteStaffMemberApiParams = {
  closeModal?: () => void;
};

export const useDeleteStaffMemberApi = ({
  closeModal,
}: useDeleteStaffMemberApiParams) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteStaffMemberPutFn,
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-members-list"] });

      notifications.show({
        position: "top-center",
        message: "Deleted",
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
