import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation } from "@tanstack/react-query";
import { TInquiry } from "../../types/t";

type TUpdateBody = {
  inquiries: Partial<TInquiry>[];
};

const updateInquiries = async ({ inquiries }: TUpdateBody) => {
  const response = await axiosPrivate.put(`/inquiry/update-inquiries`, {
    inquiries,
  });
  return response.data;
};

export const useUpdateInquiriesApi = () => {
  return useMutation({
    mutationFn: updateInquiries,
    retry: 1,
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios", { position: "top-center" });
    },
  });
};
