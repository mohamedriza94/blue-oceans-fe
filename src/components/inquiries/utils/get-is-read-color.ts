import { TInquiry } from "../types/t";

export const getIsReadColor = (isRead: TInquiry["isRead"]) => {
  let color: string = "";

  switch (isRead) {
    case true:
      color = "blue.5";
      break;
    case false:
      color = "orange.3";
      break;
  }

  return color;
};
