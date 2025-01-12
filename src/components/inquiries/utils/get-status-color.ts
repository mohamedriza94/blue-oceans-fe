import { TInquiry } from "../types/t";

export const getStatusColor = (status: TInquiry["status"] | undefined) => {
  let color: string = "";

  switch (status) {
    case "pending":
      color = "yellow.5";
      break;
    case "resolved":
      color = "green.7";
      break;
    case "closed":
      color = "gray.9";
      break;
  }

  return color;
};
