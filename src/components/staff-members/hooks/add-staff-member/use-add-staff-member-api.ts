import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation } from "@tanstack/react-query";
import { TStaffMember } from "../../types/staff-member";

const addStaffMemberPostFn = async (data: Partial<TStaffMember>) => {
  const response = await axiosPrivate.post(
    "/staff-member/create-account",
    data,
  );
  return response.data;
};

export const useAddStaffMemberApi = () => {
  const mutation = useMutation({
    mutationFn: addStaffMemberPostFn,
    retry: 1,
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios", { position: "top-center" });
    },
  });

  return mutation;
};
