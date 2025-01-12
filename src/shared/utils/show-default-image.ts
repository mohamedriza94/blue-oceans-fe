import { TImage } from "../types/image";

export const showDefaultImage = (images: TImage[]) => {
  return images?.find((image) => image.isDefault)?.url || images[0].url;
};
