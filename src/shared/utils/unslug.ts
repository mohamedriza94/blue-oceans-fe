export const unslugText = (text: string, symbol: string = "-"): string => {
  const regex = new RegExp(`\\${symbol}`, "g");
  return text.replace(regex, " ");
};
