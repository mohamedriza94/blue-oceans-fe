import { useState } from "react";
import axios from "axios";
import { envData } from "@/shared/constants/env-data";
import { notifications } from "@mantine/notifications";

export const useCloudinaryBulkUpload = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const uploadFiles = async (files: File[]) => {
    setUploading(true);
    setIsSuccess(true);

    let uploadedCount: number = 0;
    let totalFiles: number = files.length;

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${envData.cloudinary.cloudName}/upload`;
    const uploadPreset = "temp_uploads";

    const uploadedUrls: string[] = [];

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

        uploadedUrls.push(response.data.secure_url);
        uploadedCount++;
      }

      notifications.show({
        position: "top-center",
        color: "green.4",
        title: `${uploadedCount} file(s) out of ${totalFiles} uploaded`,
        message: null,
        withCloseButton: true,
      });

      return uploadedUrls;
    } catch (err) {
      setIsSuccess(false);
      return [];
    } finally {
      setUploading(false);
    }
  };

  return { uploading, isSuccess, uploadFiles };
};
