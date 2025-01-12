import { Stack, Text } from "@mantine/core";
import { RiEmotionSadFill, RiQuestionFill } from "@remixicon/react";

type NoInquiryViewProps = {
  viewType: "error" | "not-selected" | null;
};

export const NoInquiryView = ({ viewType }: NoInquiryViewProps) => {
  if (viewType == "error") {
    return (
      <Stack justify={"center"} align="center" flex={1}>
        <RiEmotionSadFill
          color="var(--mantine-color-amaranthRed-5)"
          size={50}
        />
        <Text fw={600} c={"amaranthRed.5"}>
          Sorry. I couldn't load it
        </Text>
      </Stack>
    );
  }

  if (viewType == "not-selected") {
    return (
      <Stack justify={"center"} align="center" flex={1}>
        <RiQuestionFill color="var(--mantine-color-amaranthRed-5)" size={50} />
        <Text fw={600} c={"amaranthRed.5"}>
          Select an Inquiry
        </Text>
      </Stack>
    );
  }
};
