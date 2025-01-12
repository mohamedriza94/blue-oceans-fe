import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { CustomFile } from "@/shared/components/custom-dropzone/types";
import { envData } from "@/shared/constants/env-data";
import { notifications } from "@mantine/notifications";
import { TImage } from "@/shared/types/image";
import { getFileFromUrl } from "../get-file-from-url";

export const useCloudinaryCustomBulkUpload = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleUpload = async (
    files: (CustomFile & { uploaded?: boolean; url?: string })[],
    setFiles: Dispatch<SetStateAction<CustomFile[]>>,
  ): Promise<TImage[]> => {
    // Separate files
    const alreadyUploadedFiles = files.filter((file) => file.uploaded);
    const filesToUpload = files.filter((file) => !file.uploaded);

    // Upload only files that are not uploaded yet
    const newlyUploadedFiles = await uploadFilesToCloudinary(filesToUpload);

    // Convert uploaded files to `File` objects using `getFileFromUrl`
    const processedNewFiles = await Promise.all(
      newlyUploadedFiles.map(async (file) => {
        const fileFromUrl = await getFileFromUrl(
          file.url || "",
          file.name || "uploaded-file",
        );
        return Object.assign(fileFromUrl ? fileFromUrl : file, file);
      }),
    );

    // Merge all files and update state
    const mergedFiles = [...alreadyUploadedFiles, ...processedNewFiles];
    setFiles(mergedFiles);

    // Return only TImage format with defaults
    return mergedFiles.map(({ url, alt, isDefault }) => ({
      url: url || "",
      alt: alt || "",
      isDefault: isDefault ?? false,
    }));
  };

  const uploadFilesToCloudinary = async (
    files: CustomFile[],
  ): Promise<CustomFile[]> => {
    if (files.length === 0) return []; // No files to upload

    setUploading(true);
    setIsSuccess(true);

    const uploadedFiles: CustomFile[] = [];
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${envData.cloudinary.cloudName}/upload`;
    const uploadPreset = "temp_uploads";

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const response = await axios.post(cloudinaryUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        uploadedFiles.push({
          ...file,
          url: response.data.secure_url,
          uploaded: true,
        });
      }

      notifications.show({
        position: "top-center",
        color: "green.4",
        title: `${uploadedFiles.length} file(s) uploaded successfully`,
        message: null,
        withCloseButton: true,
      });

      return uploadedFiles;
    } catch (error) {
      setIsSuccess(false);

      notifications.show({
        position: "top-center",
        color: "red.5",
        title: "File upload failed",
        message: "An error occurred during the upload process.",
        withCloseButton: true,
      });

      return [];
    } finally {
      setUploading(false);
    }
  };

  return { uploading, isSuccess, handleUpload };
};
