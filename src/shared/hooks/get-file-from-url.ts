export const getFileFromUrl = async (
  url: string,
  fileName: string,
): Promise<File | null> => {
  try {
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      return null;
    }

    const blob = await response.blob();

    return new File([blob], fileName, { type: blob.type });
  } catch (error) {
    return null;
  }
};
