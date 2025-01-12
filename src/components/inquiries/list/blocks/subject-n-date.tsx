import { Text } from "@mantine/core";
import dateFormat from "dateformat";
import { TInquiry } from "../../types/t";

type InquiryListSubjectAndDateProps = {
  inquiry: TInquiry;
};

export const InquiryListSubjectAndDate = ({
  inquiry,
}: InquiryListSubjectAndDateProps) => {
  return (
    <>
      <Text
        c={"gray.6"}
        size="xs"
        lineClamp={1}
        style={{ textOverflow: "elipsis" }}
      >
        {inquiry.subject}
      </Text>

      <Text c={"gray.6"} size="xs">
        {dateFormat(inquiry?.createdAt, "mmm d, yyyy | h:MM TT")}
      </Text>
    </>
  );
};
