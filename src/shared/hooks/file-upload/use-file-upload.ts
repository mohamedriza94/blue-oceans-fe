import { ShowErrors } from "@/shared/utils/show-errors";
import { useCloudinaryBulkUpload } from "../cloudinary/use-cloudinary-bulk-upload";

export type FileType = "pdf" | "docx" | "xlsx" | "jpeg" | "png" | "gif";

type FileUploadConfig = {
  allowedFileTypes?: FileType[];
  maxFileCount?: number;
  maxFileSizeInMB?: number;
};

const mimeTypeMap: Record<FileType, string> = {
  jpeg: "JPEG",
  png: "PNG",
  gif: "GIF",
  pdf: "PDF",
  docx: "DOCX",
  xlsx: "XLSX",
};

const fileMimeTypeMap: Record<FileType, string> = {
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  pdf: "application/pdf",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

export const useFileUpload = (config: FileUploadConfig = {}) => {
  const cloudinaryUploadHook = useCloudinaryBulkUpload();

  const allowedFileTypes = config.allowedFileTypes
    ? config.allowedFileTypes.map((type) => fileMimeTypeMap[type])
    : [fileMimeTypeMap.jpeg, fileMimeTypeMap.png];

  const maxFileCount = config.maxFileCount || 100;
  const maxFileSizeInMB = config.maxFileSizeInMB || 10;
  const maxFileSize = maxFileSizeInMB * 1024 * 1024;

  const handleUpload = async (files: File[]) => {
    // Validate file types
    const invalidFiles = files.filter(
      (file) => !allowedFileTypes.includes(file.type),
    );
    if (invalidFiles.length > 0) {
      ShowErrors([
        `Only ${config.allowedFileTypes?.map((type) => mimeTypeMap[type]).join(", ")} files are allowed`,
      ]);
      return;
    }

    // Validate file count
    if (files.length > maxFileCount) {
      ShowErrors([`You can upload a maximum of ${maxFileCount} files.`]);
      return;
    }

    // Validate file size
    const oversizedFiles = files.filter((file) => file.size > maxFileSize);
    if (oversizedFiles.length > 0) {
      ShowErrors([`File size cannot exceed ${maxFileSizeInMB}MB`]);
      return;
    }

    return await cloudinaryUploadHook.uploadFiles(files);
  };

  return {
    ...cloudinaryUploadHook,
    handleUpload,
  };
};
