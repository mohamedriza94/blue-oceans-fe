import { TDeletion } from "./deletion";
import { TTimestamp } from "./timestamp";

export type TUser = {
  _id: String;
  email: string;
  password?: string;
  fullName?: string;
  twoFactorAuthEnabled?: boolean;
} & TTimestamp &
  TDeletion;
