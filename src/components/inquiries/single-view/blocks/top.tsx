import { ActionIcon, Badge, Flex } from "@mantine/core";
import { getPriorityColor } from "../../utils/get-priority-color";
import { getStatusColor } from "../../utils/get-status-color";
import { RiCloseLine } from "@remixicon/react";
import { TInquiry } from "../../types/t";

type SingleInquirySenderInfoBlockProps = {
  inquiry: TInquiry;
  setSelectedInquiry: (value: TInquiry["_id"] | null) => void;
};

export const SingleInquiryTopBlock = ({
  inquiry,
  setSelectedInquiry,
}: SingleInquirySenderInfoBlockProps) => {
  return (
    <Flex justify={"space-between"} gap={"xs"}>
      <ActionIcon
        size={"xs"}
        color="gray.4"
        onClick={() => setSelectedInquiry(null)}
      >
        <RiCloseLine />
      </ActionIcon>
      <Flex align={"center"} gap={"xs"}>
        <Badge
          title="Priority"
          size="xs"
          variant="filled"
          color={getPriorityColor(inquiry?.priority)}
        >
          {inquiry?.priority}
        </Badge>
        <Badge
          title="Status"
          size="xs"
          variant="light"
          color={getStatusColor(inquiry?.status)}
        >
          {inquiry?.status}
        </Badge>
      </Flex>
    </Flex>
  );
};
