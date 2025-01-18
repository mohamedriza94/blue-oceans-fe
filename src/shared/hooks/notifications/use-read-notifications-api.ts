import { axiosPrivate } from "@/shared/lib/axios/private";
import { queryOptions, useQuery } from "@tanstack/react-query";

export type TNotification = {
  _id?: string;
  status: "read" | "unread";
  icon?: string;
  relatedEntityId?: string;
  title: string;
  description: string;
  link: string;
  showToChiefOccupantId?: string;
};

const fetchData = () => {
  return axiosPrivate.get(`/notification/read-notifications`);
};

const getNotificationsQueryOptions = () => {
  return queryOptions({
    queryKey: ["notification-list"],
    queryFn: () => fetchData(),
  });
};

export const useGetNotifications = (limit = 10) => {
  const reactQuery = useQuery({
    ...getNotificationsQueryOptions(),
  });

  return reactQuery;
};
