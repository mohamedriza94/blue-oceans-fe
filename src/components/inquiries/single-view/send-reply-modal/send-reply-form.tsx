import { RefObject } from "react";
import { TInquiry } from "../../types/t";
import { Box, Button, Group, Stack, Textarea } from "@mantine/core";
import { useSendReplyForm } from "../../hooks/send-reply/use-send-reply-form";

type SendReplyFormProps = {
  inquiry: TInquiry | null;
  sendReplyModalRef: RefObject<{ open: () => void; close: () => void }>;
};

export const SendReplyForm = ({
  inquiry,
  sendReplyModalRef,
}: SendReplyFormProps) => {
  const { form, handleSubmit, isPending } = useSendReplyForm({
    closeModal: () => sendReplyModalRef.current?.close(),
    inquiryID: inquiry?._id
  });

  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack gap="xs">
          <Textarea
            label="Reply"
            placeholder="Enter your reply here"
            withAsterisk
            size="sm"
            disabled={isPending}
            {...form.getInputProps("message")}
          />

          <Group justify="flex-end" gap="xs">
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={() => form.reset()}
              disabled={isPending}
            >
              Clear
            </Button>
            <Button
              type="submit"
              variant="filled"
              size="sm"
              loading={isPending}
              disabled={isPending}
            >
              Submit
            </Button>
          </Group>
        </Stack>
      </form>
    </Box>
  );
};
