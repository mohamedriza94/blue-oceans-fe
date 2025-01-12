import { Badge, Flex, Text } from "@mantine/core";
import dateFormat from "dateformat";
import { TInquiry } from "../../types/t";
import { getPriorityColor } from "../../utils/get-priority-color";
import { getStatusColor } from "../../utils/get-status-color";

type InquiryListTopProps = {
  inquiry: TInquiry;
};

export const InquiryListTop = ({ inquiry }: InquiryListTopProps) => {
  return (
    <Flex align={"center"} justify={"space-between"} gap={"xs"}>
      <Text c={"gray.8"} fw={500} size={"sm"}>
        {inquiry.sender.email}
      </Text>

      <Flex align={"center"} gap={"xs"}>
        <Badge
          title="Priority"
          size="xs"
          variant="filled"
          color={getPriorityColor(inquiry.priority)}
        >
          {inquiry.priority}
        </Badge>
        <Badge
          title="Status"
          size="xs"
          variant="light"
          color={getStatusColor(inquiry.status)}
        >
          {inquiry.status}
        </Badge>
      </Flex>
    </Flex>
  );
};
