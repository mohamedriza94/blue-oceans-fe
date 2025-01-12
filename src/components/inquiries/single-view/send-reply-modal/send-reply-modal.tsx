import { RefObject } from "react";
import { TInquiry } from "../../types/t";
import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { SendReplyForm } from "./send-reply-form";

type SendReplyModalProps = {
  inquiry: TInquiry | null;
  sendReplyModalRef: RefObject<{ open: () => void; close: () => void }>;
};

export const SendReplyModal = ({
  inquiry,
  sendReplyModalRef,
}: SendReplyModalProps) => {
  return (
    <CustomMantineModal
      ref={sendReplyModalRef}
      centered
      size={"lg"}
      title={"Send a Reply"}
      styles={{
        title: {
          fontWeight: 600,
        },
      }}
    >
      <SendReplyForm inquiry={inquiry} sendReplyModalRef={sendReplyModalRef} />
    </CustomMantineModal>
  );
};
