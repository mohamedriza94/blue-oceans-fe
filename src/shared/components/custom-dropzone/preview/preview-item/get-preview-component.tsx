import { AspectRatio, Image, Stack, Text } from "@mantine/core";
import {
  IMAGE_MIME_TYPE,
  MS_EXCEL_MIME_TYPE,
  MS_WORD_MIME_TYPE,
  PDF_MIME_TYPE,
} from "@mantine/dropzone";
import {
  RiFile3Line,
  RiFileExcelLine,
  RiFilePdf2Line,
  RiFileWordLine,
} from "@remixicon/react";
import { CustomFile } from "../../types";

const getIconForFileType = (file: File) => {
  if (PDF_MIME_TYPE.includes(file.type as any)) {
    return (
      <RiFilePdf2Line size={30} color={"var(--mantine-color-blue-4)"} />
    );
  } else if (MS_EXCEL_MIME_TYPE.includes(file.type as any)) {
    return (
      <RiFileExcelLine size={30} color={"var(--mantine-color-blue-4)"} />
    );
  } else if (MS_WORD_MIME_TYPE.includes(file.type as any)) {
    return (
      <RiFileWordLine size={30} color={"var(--mantine-color-blue-4)"} />
    );
  } else {
    return (
      <RiFile3Line size={30} color={"var(--mantine-color-blue-4)"} />
    );
  }
};

export const getPreviewComponent = (file: CustomFile) => {
  if (IMAGE_MIME_TYPE.includes(file.type as any)) {
    const imageUrl = URL.createObjectURL(file);
    return (
      <>
        <AspectRatio ratio={1080 / 720}>
          <Image
            h={"100%"}
            alt={file.name}
            radius={4}
            src={imageUrl}
            onLoad={() => URL.revokeObjectURL(imageUrl)}
          />
        </AspectRatio>
      </>
    );
  } else {
    return (
      <Stack justify="center" align="center" gap={0} flex={1}>
        {getIconForFileType(file)}
        <Text
          fw={500}
          w={100}
          lineClamp={1}
          size="sm"
          c="gray.6"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {file.name}
        </Text>
      </Stack>
    );
  }
};
