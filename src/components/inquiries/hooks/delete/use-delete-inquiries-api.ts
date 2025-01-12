import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation } from "@tanstack/react-query";
import { TInquiry } from "../../types/t";

type TDeleteBody = {
  inquiryIDs: TInquiry["_id"][];
};

const deleteInquiries = async ({ inquiryIDs }: TDeleteBody) => {
  const response = await axiosPrivate.delete(`/inquiry/delete-inquiries`, {
    data: { inquiryIDs },
  });
  return response.data;
};

export const useDeleteInquiriesApi = () => {
  return useMutation({
    mutationFn: deleteInquiries,
    retry: 1,
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios", { position: "top-center" });
    },
  });
};
