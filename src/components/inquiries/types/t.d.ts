import { TContactNumber } from "@/shared/types/contact";
import { TTimestamp } from "@/shared/types/timestamp";

export type TInquiryReply = {
  replierStaffMemberID?: string;
  message: string;
  repliedAt?: Date;
};

export type TInquiry = {
  _id?: string;
  sender: {
    name?: string;
    email: string;
    contactNumber?: TContactNumber;
  };
  subject?: string;
  message: string;
  priority: string;
  status: string;
  resolvedAt?: Date;
  isRead: boolean;
  replies?: TInquiryReply[];
} & TTimestamp;
