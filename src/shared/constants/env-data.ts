export const envData = {
  mainBaseURL: process.env.NEXT_PUBLIC_API_MAIN_BASE_URL,
  mainBasePath: process.env.NEXT_PUBLIC_API_MAIN_BASE_PATH,
  cloudinary: {
    apiSecret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
};
