import { axiosPrivate } from "@/shared/lib/axios/private";
import {
  TStaffMember,
  useStaffMemberStore,
} from "@/shared/stores/staff-member-store";
import { useTokenStore } from "@/shared/stores/token-store";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const fetchMyAccountDetails = async (): Promise<{
  data: TStaffMember;
}> => {
  return axiosPrivate.get("/me/read-my-account");
};

const useGetMyAccountDetailsQuery = () => {
  const { accessToken } = useTokenStore();

  return useQuery({
    queryKey: ["my-account-details", accessToken],
    queryFn: fetchMyAccountDetails,
    staleTime: Infinity,
    select: (data) => data.data || [],
  });
};

export const useGetMyAccountDetails = () => {
  const { setStaffMember } = useStaffMemberStore();
  const myAccountDetailsQuery = useGetMyAccountDetailsQuery();

  useEffect(() => {
    if (myAccountDetailsQuery.isSuccess) {
      setStaffMember(myAccountDetailsQuery.data);
    }
  }, [myAccountDetailsQuery.isSuccess]);

  if (myAccountDetailsQuery.isError) {
    ShowErrors(["Failed to fetch details at this time. Try logging in again."]);
  }

  return { ...myAccountDetailsQuery };
};
