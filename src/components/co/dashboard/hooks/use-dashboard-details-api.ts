import { axiosPrivate } from "@/shared/lib/axios/private";
import { useTokenStore } from "@/shared/stores/token-store";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useQuery } from "@tanstack/react-query";

const fetchFn = async (): Promise<{
  data: any;
}> => {
  return axiosPrivate.get("/me/dashboard");
};

const useGetMyDashboardQuery = () => {
  const { accessToken } = useTokenStore();

  return useQuery({
    queryKey: ["dashboard-details", accessToken],
    queryFn: fetchFn,
    staleTime: Infinity,
    select: (data) => data.data.data,
  });
};

export const useGetMyDashboard = () => {
  const dashboardDetailsQuery = useGetMyDashboardQuery();

  if (dashboardDetailsQuery.isError) {
    ShowErrors(["Failed to fetch details at this time. Try logging in again."]);
  }

  return { ...dashboardDetailsQuery };
};
