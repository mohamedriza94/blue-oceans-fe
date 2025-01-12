import { Stack } from "@mantine/core";
import { CustomDropzoneProps } from "./types";
import { DropzoneComponent } from "./dropzone";
import { Preview } from "./preview";

export const CustomDropzone = ({
  dropzoneProps,
  maxFileSizeInMB = 3,
  maxFiles = 5,
  customChildComponent,
  allowedTypes = ["image"],
  files,
  setFiles,
  isUploading,
}: CustomDropzoneProps) => {
  return (
    <Stack gap={"xs"}>
      <DropzoneComponent
        setFiles={setFiles}
        files={files}
        allowedTypes={allowedTypes}
        customChildComponent={customChildComponent}
        maxFileSizeInMB={maxFileSizeInMB}
        maxFiles={maxFiles}
        dropzoneProps={dropzoneProps}
        isUploading={isUploading}
      />

      {files.length ? (
        <Preview
          files={files}
          setFiles={setFiles}
          isUploading={isUploading ?? false}
        />
      ) : (
        <></>
      )}
    </Stack>
  );
};
