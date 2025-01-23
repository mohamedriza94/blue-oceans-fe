import { TImage } from "../types/image";

export const showDefaultImage = (images: TImage[]) => {
  return (
    images?.find((image) => image.isDefault)?.url ||
    images[0]?.url ||
    "http://res.cloudinary.com/dziodufj8/image/upload/v1736911344/temp/swygljxyvb8muitbezwg.png"
  );
};
