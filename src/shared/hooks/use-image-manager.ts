import { useEffect, useState } from "react";
import { TImage } from "@/shared/types/image";
import { CustomFile } from "@/shared/components/custom-dropzone/types";
import { generateRandomNumber } from "@/shared/utils/generate-random-number";
import { processImages } from "@/shared/utils/process-images";

export function useImageManager() {
  const [existingUrlImages, setExistingUrlImages] = useState<TImage[]>([]);
  const [existingFileImages, setExistingFileImages] = useState<CustomFile[]>(
    [],
  );
  const [allFiles, setAllFiles] = useState<CustomFile[]>([]);
  const [deletedFiles, setDeletedFiles] = useState<TImage[]>([]);

  const syncImagesToFileImages = async (initialImages: TImage[]) => {
    const urlArray = initialImages.map((img) => ({
      id: generateRandomNumber(10),
      ...img,
    }));
    const fileArray = await processImages(urlArray);
    setExistingUrlImages(urlArray);
    setExistingFileImages(fileArray);
  };

  useEffect(() => {
    setAllFiles(existingFileImages);
  }, [existingFileImages]);

  // Splitting new and deleted files
  useEffect(() => {
    const removedOnes = existingFileImages.filter(
      (existing) => !allFiles.some((file) => file.id === existing.id),
    );

    const deletedInTImageFormat = removedOnes
      .map((file) => {
        const correspondingUrlImage = existingUrlImages.find(
          (img) => img.id === file.id,
        );
        return correspondingUrlImage || null;
      })
      .filter(Boolean) as TImage[];

    setDeletedFiles(deletedInTImageFormat);
  }, [allFiles, existingFileImages, existingUrlImages]);

  return {
    existingUrlImages,
    setExistingUrlImages,
    existingFileImages,
    setExistingFileImages,
    syncImagesToFileImages,
    allFiles,
    setAllFiles,
    deletedFiles,
  };
}
