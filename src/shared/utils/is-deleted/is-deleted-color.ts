export const isDeletedColor = (isDeleted: boolean | undefined | null) => {
  return isDeleted ? "var(--mantine-color-red-1)" : "";
};
