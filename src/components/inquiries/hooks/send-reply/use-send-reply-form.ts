import { z } from "zod";
import { useAlertModal } from "@/shared/components/alert-modal/use-alert-modal";
import { useForm, zodResolver } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { useSendReplyToInquiryApi } from "./use-send-reply-api";
import { TInquiry } from "../../types/t";

export const ZOD_sendReplySchema = z.object({
  message: z
    .string()
    .min(1, { message: "Message must not be empty" })
    .max(1000, { message: "Message must be 1000 characters or fewer" }),
});

export type FormValues = z.infer<typeof ZOD_sendReplySchema>;

type useSendReplyFormParams = {
  closeModal?: () => void;
  inquiryID: TInquiry["_id"];
};

export const useSendReplyForm = ({
  closeModal,
  inquiryID,
}: useSendReplyFormParams) => {
  const queryClient = useQueryClient();
  const { mutate, ...sendReplyApiData } = useSendReplyToInquiryApi();
  const showAlert = useAlertModal();

  const form = useForm<FormValues>({
    initialValues: {
      message: "",
    },
    validate: zodResolver(ZOD_sendReplySchema),
  });

  const handleSubmit = (values: FormValues) => {
    mutate(
      { ...values, inquiryID },
      {
        onSuccess: () => {
          form.reset();

          closeModal && closeModal();

          queryClient.invalidateQueries({ queryKey: ["inquiries-list"] });
          queryClient.invalidateQueries({
            queryKey: ["inquiry", inquiryID],
          });
          showAlert({
            type: "success",
            defaultChildrenTexts: {
              headerText: "Reply Sent",
              subtext: "Your reply has been successfully sent.",
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
    ...sendReplyApiData,
  };
};
