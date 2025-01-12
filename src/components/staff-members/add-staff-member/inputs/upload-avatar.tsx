import { Avatar, Button, FileButton, Flex } from "@mantine/core";
import { useRef } from "react";

type UploadAvatarProps = {
  file: File | null;
  setFile: (file: File | null) => void;
  uploading: boolean;
  isSubmitting: boolean;
};

export const UploadAvatar = ({
  file,
  setFile,
  uploading,
  isSubmitting,
}: UploadAvatarProps) => {
  const resetRef = useRef<() => void>(null);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  return (
    <Flex align={"center"} justify={"center"} gap={"sm"}>
      <Avatar
        size={"lg"}
        src={file ? URL.createObjectURL(file) : ""}
        alt="Avatar Preview"
      />

      <FileButton
        resetRef={resetRef}
        onChange={setFile}
        accept="image/png, image/jpeg"
      >
        {(props) => (
          <Button
            size="xs"
            variant="light"
            {...props}
            disabled={uploading || isSubmitting}
          >
            {uploading ? "Uploading..." : "Select Avatar"}
          </Button>
        )}
      </FileButton>

      {file && (
        <Button
          size="xs"
          color="red"
          variant="outline"
          onClick={clearFile}
          disabled={uploading || isSubmitting}
        >
          Clear
        </Button>
      )}
    </Flex>
  );
};
