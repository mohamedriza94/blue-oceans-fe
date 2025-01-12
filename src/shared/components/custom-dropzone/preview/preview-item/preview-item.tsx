import { ActionIcon, Checkbox, Flex, Paper, rem, Stack } from "@mantine/core";
import { CustomFile } from "../../types";
import { RiCloseLine } from "@remixicon/react";
import { AltText } from "./alt-text";
import { getPreviewComponent } from "./get-preview-component";

type PreviewItemProps = {
  idx: number;
  file: CustomFile;
  removeFile: (idx: number) => void;
  handleSetDefault: (idx: number) => void;
  handleAltText: (idx: number, altText: string) => void;
  isUploading: boolean;
};

export const PreviewItem = ({
  file,
  idx,
  removeFile,
  handleSetDefault,
  handleAltText,
  isUploading,
}: PreviewItemProps) => {
  return (
    <Paper
      withBorder
      radius={"sm"}
      key={idx + "File-Preview"}
      w={120}
      title={file.name}
      pos="relative"
    >
      <Flex
        direction={"row-reverse"}
        pos="absolute"
        top={2}
        right={2}
        gap={"xs"}
        align="center"
        justify="space-between"
        p={2}
        style={{
          borderRadius: rem(5),
        }}
      >
        <ActionIcon
          size={"xs"}
          radius={"sm"}
          onClick={() => removeFile(idx)}
          title="Remove"
          type="button"
          disabled={isUploading}
        >
          <RiCloseLine />
        </ActionIcon>

        <Checkbox
          size="xs"
          color="blue.5"
          title="Set Default"
          checked={file.isDefault}
          onChange={() => handleSetDefault(idx)}
          disabled={isUploading}
        />

        <AltText
          altTextValue={file.alt ?? ""}
          idx={idx}
          handleAltText={handleAltText}
        />
      </Flex>

      <Stack justify="space-between" align="center" gap={0} h={"100%"}>
        {getPreviewComponent(file)}
      </Stack>
    </Paper>
  );
};
