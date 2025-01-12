import { TUser } from "@/shared/types/user";

export type TStaffMember = {
  avatar?: string | null;
  roles: ENUMStaffMemberRole[];
  status: ENUMStaffMemberStatus;
} & TUser;
