import { notifications } from "@mantine/notifications";
import { CustomFile } from "../components/custom-dropzone/types";
import { getFileFromUrl } from "../hooks/get-file-from-url";
import { TImage } from "../types/image";
import { generateRandomNumber } from "./generate-random-number";

export async function processImages(images: TImage[]): Promise<CustomFile[]> {
  const fetchedFiles: CustomFile[] = [];

  const notificationId = "notifId";
  notifications.show({
    id: notificationId,
    color: "blue.5",
    loading: true,
    title: "Processing Images",
    message: "",
    position: "top-center",
  });

  for (const img of images) {
    const fileBlob = await getFileFromUrl(img.url, generateRandomNumber());
    if (!fileBlob) continue;
    const customFile: CustomFile = Object.assign(fileBlob, {
      alt: img.alt,
      isDefault: img.isDefault,
      url: img.url,
      uploaded: true,
      id: img.id,
    });
    fetchedFiles.push(customFile);
  }

  notifications.hide(notificationId);

  return fetchedFiles;
}
