import { Flex, rem, ScrollAreaAutosize } from "@mantine/core";
import { CustomDropzoneProps } from "../types";
import { PreviewItem } from "./preview-item";
import { useFileDrop } from "../hooks/use-file-drop";

type PreviewProps = {
  files: CustomDropzoneProps["files"];
  setFiles: CustomDropzoneProps["setFiles"];
  isUploading: boolean;
};

export const Preview = ({ files, setFiles, isUploading }: PreviewProps) => {
  const { removeFile } = useFileDrop(0, setFiles);

  const handleSetDefault = (idx: number) => {
    setFiles((prevFiles) =>
      prevFiles.map((f, index) =>
        Object.assign(f, { isDefault: index === idx }),
      ),
    );
  };

  const handleAltText = (idx: number, altText: string) => {
    setFiles((prevFiles) =>
      prevFiles.map((f, index) =>
        index === idx ? Object.assign(f, { alt: altText }) : f,
      ),
    );
  };

  return (
    <ScrollAreaAutosize mah={200} type="auto" offsetScrollbars>
      <Flex
        style={{ borderRadius: rem(20) }}
        gap={5}
        wrap={"wrap"}
        align={"stretch"}
      >
        {files.map((file, idx) => (
          <PreviewItem
            removeFile={removeFile}
            file={file}
            idx={idx}
            handleSetDefault={handleSetDefault}
            handleAltText={handleAltText}
            isUploading={isUploading}
          />
        ))}
      </Flex>
    </ScrollAreaAutosize>
  );
};
