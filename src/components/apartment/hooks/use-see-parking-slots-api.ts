import { axiosPrivate } from "@/shared/lib/axios/private";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { TBuilding } from "../table";

export type TParkingSlot = {
  buildingId: string;
  slotNumber: string;
  status: "Available" | "Occupied";
};

const fetchData = async (
  id: TBuilding["_id"],
): Promise<TParkingSlot[] | null> => {
  if (!id) return null;

  const result = await axiosPrivate.get(
    `/parking/read-parking-slots-of-building/${id}`,
  );
  return result.data?.data;
};

export const getOneParkingQueryOptions = ({ id }: { id: TBuilding["_id"] }) => {
  return queryOptions({
    queryKey: ["parking-for-building", id],
    queryFn: () => fetchData(id),
    staleTime: 0,
  });
};

export const useGetParkingSlotsOfBuilding = (id: TBuilding["_id"]) => {
  const reactQuery = useQuery({
    ...getOneParkingQueryOptions({ id }),
  });

  return reactQuery;
};
