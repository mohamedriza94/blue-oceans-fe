import { TInquiry } from "../types/t";

export const getPriorityColor = (
  priority: TInquiry["priority"] | undefined,
) => {
  let color: string = "";

  switch (priority) {
    case "low":
      color = "blue.5";
      break;
    case "medium":
      color = "yellow.5";
      break;
    case "high":
      color = "lightRed.7";
      break;
  }

  return color;
};
