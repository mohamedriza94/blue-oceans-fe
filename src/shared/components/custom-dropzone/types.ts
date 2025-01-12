import { ReactNode } from "react";
import { defaultFileTypes } from "./config";
import { DropzoneProps } from "@mantine/dropzone";
import { TImage } from "@/shared/types/image";

export type FileTypeConfig = {
  mimeTypes: string[];
  icon: ReactNode;
  color?: string;
};

export type CustomFile = File & Partial<TImage>;

export type CustomUploadValidation = {
  maxFileSizeInMB?: number;
  maxFiles?: number;
  customValidation?: (file: File) => boolean | string;
};

export type CustomPreviewProps = {
  file: CustomFile;
  index: number;
  onRemove: (index: number) => void;
};

export type CustomDropzoneProps = {
  dropzoneProps?: Partial<DropzoneProps>;
  customChildComponent?: React.ReactNode;
  allowedTypes?: (keyof typeof defaultFileTypes)[];
  files: CustomFile[];
  setFiles: React.Dispatch<React.SetStateAction<CustomFile[]>>;
  maxFileSizeInMB?: number;
  maxFiles?: number;
  handleUploadClick?: () => void;
  isUploading?: boolean;
};
