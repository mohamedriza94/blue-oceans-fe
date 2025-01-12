import { List, Stack, Text, ThemeIcon } from "@mantine/core";
import { RiMailLine, RiPhoneLine, RiUser2Line } from "@remixicon/react";
import { TInquiry } from "../../types/t";

type SingleInquirySenderInfoBlockProps = {
  inquiry: TInquiry;
};

export const SingleInquirySenderInfoBlock = ({
  inquiry,
}: SingleInquirySenderInfoBlockProps) => {
  return (
    <Stack align="start" justify="start" gap={5}>
      <Text fw={600} c={"amaranthRed.5"}>
        Sender Info.
      </Text>
      <List spacing={5} size="sm" c={"gray.5"}>
        {inquiry?.sender.name && (
          <List.Item
            icon={
              <ThemeIcon radius={"xl"} color="gray.6" size={"sm"}>
                <RiUser2Line size={13} />
              </ThemeIcon>
            }
          >
            {inquiry?.sender.name}
          </List.Item>
        )}
        <List.Item
          icon={
            <ThemeIcon radius={"xl"} color="gray.6" size={"sm"}>
              <RiMailLine size={13} />
            </ThemeIcon>
          }
        >
          {inquiry?.sender.email}
        </List.Item>

        {inquiry?.sender.contactNumber && (
          <List.Item
            icon={
              <ThemeIcon radius={"xl"} color="gray.6" size={"sm"}>
                <RiPhoneLine size={13} />
              </ThemeIcon>
            }
          >
            {`${inquiry?.sender.contactNumber?.countryDialCode}${inquiry?.sender.contactNumber?.localNumber}`}
          </List.Item>
        )}
      </List>
    </Stack>
  );
};
