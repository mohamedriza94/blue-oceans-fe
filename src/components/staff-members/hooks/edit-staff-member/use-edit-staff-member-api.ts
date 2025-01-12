import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TStaffMember } from "../../types/staff-member";

type TEditStaffMemberPostFn = {
  staffMemberId: TStaffMember["_id"];
  data: Partial<TStaffMember>;
};

const editStaffMemberPostFn = async ({
  staffMemberId,
  data,
}: TEditStaffMemberPostFn) => {
  const response = await axiosPrivate.put(
    `/staff-member/update-account/${staffMemberId}`,
    data,
  );
  return response.data;
};

export const useEditStaffMemberApi = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: editStaffMemberPostFn,
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-members-list"] });
    },
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios", { position: "top-center" });
    },
  });

  return mutation;
};
