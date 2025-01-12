import { FileRejection } from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";

export const useFileDrop = (
  maxFileSizeInMB: number,
  setFiles: React.Dispatch<React.SetStateAction<File[]>>,
) => {
  const removeFile = (indexToRemove: number) => {
    setFiles((currentFiles) =>
      currentFiles.filter((_, index) => index !== indexToRemove),
    );
  };

  const getRejectionMessage = (rejection: FileRejection) => {
    const { file, errors } = rejection;
    return errors
      .map((error) => {
        if (error.code === "file-too-large") {
          return `File "${file.name}" is too large. Max size is ${maxFileSizeInMB} MB.`;
        }
        if (error.code === "file-invalid-type") {
          return `File "${file.name}" is in an unsupported file type.`;
        }
        return `File "${file.name}" was rejected due to an unknown error.`;
      })
      .join("\n");
  };

  const handleReject = (fileRejections: FileRejection[]) => {
    const rejectionMessages = fileRejections
      .map(getRejectionMessage)
      .join("\n");

    showNotification({
      position: "top-right",
      color: "blue.5",
      message: rejectionMessages,
    });
  };

  return {
    removeFile,
    handleReject,
  };
};
