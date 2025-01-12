import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation } from "@tanstack/react-query";
import { TInquiry } from "../../types/t";

type TSendReplyBody = {
  inquiryID: TInquiry["_id"];
  message: string;
};

const sendReplyToInquiry = async ({ inquiryID, message }: TSendReplyBody) => {
  const response = await axiosPrivate.post(
    `/inquiry/reply-to-inquiry/${inquiryID}`,
    { message },
  );
  return response.data;
};

export const useSendReplyToInquiryApi = () => {
  return useMutation({
    mutationFn: sendReplyToInquiry,
    retry: 1,
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios", { position: "top-center" });
    },
  });
};
