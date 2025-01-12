import { Flex, Stack, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { RiUpload2Fill } from "@remixicon/react";
import { CustomDropzoneProps } from "./types";
import { useFileDrop } from "./hooks/use-file-drop";
import { showNotification } from "@mantine/notifications";
import { defaultFileTypes } from "./config";

type DropzoneComponentProps = {} & CustomDropzoneProps;

export const DropzoneComponent = ({
  files,
  setFiles,
  maxFiles = 5,
  customChildComponent,
  maxFileSizeInMB = 3,
  dropzoneProps,
  allowedTypes = ["image"],
  isUploading,
}: DropzoneComponentProps) => {
  const { handleReject } = useFileDrop(maxFileSizeInMB, setFiles);

  const acceptedMimeTypes = allowedTypes
    .map((type) => defaultFileTypes[type].mimeTypes)
    .flat();

  const handleDrop = (newFiles: File[]) => {
    // Filter out duplicate files
    const nonDuplicateFiles = newFiles.filter(
      (newFile) =>
        !files.some(
          (existingFile) =>
            existingFile.name === newFile.name &&
            existingFile.size === newFile.size,
        ),
    );

    if (files.length + nonDuplicateFiles.length <= maxFiles) {
      const formattedFiles = nonDuplicateFiles.map((file) =>
        Object.assign(file, { isDefault: false, alt: "" }),
      );
      setFiles((prevFiles) => [...prevFiles, ...formattedFiles]);
    } else {
      showNotification({
        position: "top-right",
        message: `You can upload a maximum of ${maxFiles} files.`,
        color: "blue.5",
      });
    }

    if (nonDuplicateFiles.length < newFiles.length) {
      showNotification({
        position: "top-right",
        message: "Duplicate files were excluded from the upload.",
        color: "orange.5",
      });
    }
  };

  return (
    <Dropzone
      onDrop={handleDrop}
      onReject={handleReject}
      maxSize={maxFileSizeInMB * 1024 ** 2}
      maxFiles={maxFiles}
      accept={acceptedMimeTypes}
      {...dropzoneProps}
      disabled={isUploading}
    >
      {customChildComponent || (
        <Flex align="center" justify="center" gap={"sm"}>
          <RiUpload2Fill />

          <Stack gap={5} justify="center">
            <Text size="md" fw={500}>
              Drag files or Click to browse
            </Text>
            <Text size="sm" c={"gray.5"}>
              Attach up to {maxFiles} uploads. Each upload must be within{" "}
              {maxFileSizeInMB}MB.
            </Text>
          </Stack>
        </Flex>
      )}
    </Dropzone>
  );
};
