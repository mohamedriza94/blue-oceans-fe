import { Button, Divider, Flex, Stack, Text } from "@mantine/core";
import { TInquiry } from "../types/t";
import { useGetInquiry } from "../hooks/use-get-one-inquiry-api";
import { NoInquiryView } from "./error-view";
import dateFormat from "dateformat";
import { useRef } from "react";
import { SendReplyModal } from "./send-reply-modal";
import { SingleViewSkeleton } from "./single-view-skeleton";
import { SingleInquirySenderInfoBlock } from "./blocks/sender-info";
import { SingleInquiryTopBlock } from "./blocks/top";

type InquirySingleViewProps = {
  selectedInquiry: TInquiry["_id"] | null;
  setSelectedInquiry: (value: TInquiry["_id"] | null) => void;
};

export const InquirySingleView = ({
  selectedInquiry,
  setSelectedInquiry,
}: InquirySingleViewProps) => {
  const { data: inquiry, isPending, isError } = useGetInquiry(selectedInquiry);
  const sendReplyModalRef = useRef<{ open: () => void; close: () => void }>(
    null,
  );

  if (!selectedInquiry || isError) {
    return (
      <NoInquiryView
        viewType={isError ? "error" : !selectedInquiry ? "not-selected" : null}
      />
    );
  }

  if (isPending) {
    return <SingleViewSkeleton />;
  }

  return (
    <>
      <Stack align="stretch" gap={5} p={"sm"} justify="flex-start" w={"50%"}>
        {inquiry && (
          <SingleInquiryTopBlock
            inquiry={inquiry}
            setSelectedInquiry={setSelectedInquiry}
          />
        )}

        {inquiry && <SingleInquirySenderInfoBlock inquiry={inquiry} />}

        <Divider />

        <Flex justify={"space-between"} gap={"xs"}>
          <Text c={"gray.5"} size="sm">
            Received at{" "}
            {dateFormat(inquiry?.createdAt, "mmm d, yyyy | h:MM TT")}
          </Text>
          {inquiry?.resolvedAt && (
            <Text c={"green.4"} size="sm">
              Resolved at{" "}
              {dateFormat(inquiry?.resolvedAt, "mmm d, yyyy | h:MM TT")}
            </Text>
          )}
        </Flex>

        <Divider />

        <Stack align="stretch" justify="start" gap={0}>
          <Text fw={500} size="sm" c={"amaranthRed.5"}>
            Subject
          </Text>
          <Text fw={400} c={"gray.5"} size="sm">
            {inquiry?.subject}
          </Text>
        </Stack>

        <Divider />

        <Stack align="stretch" justify="start" gap={0}>
          <Text fw={500} size="sm" c={"amaranthRed.5"}>
            Message
          </Text>
          <Text fw={400} c={"gray.5"} size="sm">
            {inquiry?.message}
          </Text>
        </Stack>

        <Divider />

        {inquiry?.status == "resolved" && inquiry?.replies && (
          <Stack align="stretch" justify="start" gap={0}>
            <Text fw={500} size="sm" c={"amaranthRed.5"}>
              Reply
            </Text>
            <Text fw={400} c={"gray.5"} size="sm">
              {inquiry?.replies[0].message}
            </Text>
          </Stack>
        )}

        <Flex flex={1} align={"end"}>
          {inquiry?.status == "pending" && (
            <Button size="xs" onClick={() => sendReplyModalRef.current?.open()}>
              Send Reply
            </Button>
          )}
        </Flex>
      </Stack>

      <SendReplyModal inquiry={inquiry} sendReplyModalRef={sendReplyModalRef} />
    </>
  );
};
