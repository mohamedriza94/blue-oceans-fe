import { axiosPrivate } from "@/shared/lib/axios/private";
import { useTokenStore } from "@/shared/stores/token-store";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useQuery } from "@tanstack/react-query";

const fetchMyAccountDetails = async (): Promise<{
  data: any;
}> => {
  return axiosPrivate.get("/me");
};

const useGetMyAccountDetailsQuery = () => {
  const { accessToken } = useTokenStore();

  return useQuery({
    queryKey: ["my-account-details", accessToken],
    queryFn: fetchMyAccountDetails,
    staleTime: Infinity,
    select: (data) => data.data.data,
  });
};

export const useGetMyAccountDetails = () => {
  const myAccountDetailsQuery = useGetMyAccountDetailsQuery();

  if (myAccountDetailsQuery.isError) {
    ShowErrors(["Failed to fetch details at this time. Try logging in again."]);
  }

  return { ...myAccountDetailsQuery };
};
