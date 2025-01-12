import {
  IMAGE_MIME_TYPE,
  MIME_TYPES,
  MS_EXCEL_MIME_TYPE,
  MS_WORD_MIME_TYPE,
  PDF_MIME_TYPE,
} from "@mantine/dropzone";
import {
  RiFileExcelLine,
  RiFilePdf2Line,
  RiFileWordLine,
  RiImageAddLine,
} from "@remixicon/react";

export const defaultFileTypes = {
  image: {
    mimeTypes: IMAGE_MIME_TYPE,
    icon: RiImageAddLine,
  },
  pdf: {
    mimeTypes: PDF_MIME_TYPE,
    icon: RiFilePdf2Line,
  },
  excel: {
    mimeTypes: [...MS_EXCEL_MIME_TYPE, MIME_TYPES.csv],
    icon: RiFileExcelLine,
  },
  word: {
    mimeTypes: MS_WORD_MIME_TYPE,
    icon: RiFileWordLine,
  },
} as const;
