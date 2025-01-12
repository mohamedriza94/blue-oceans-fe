import { axiosPrivate } from "@/shared/lib/axios/private";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { TIngredient } from "../types/ingredient";

type TIngredientId = TIngredient["_id"] | null;

const fetchData = async (id: TIngredientId): Promise<TIngredient | null> => {
  if (!id) return null;

  const result = await axiosPrivate.get(`/ingredient/read-one-ingredient/${id}`);
  return result.data?.data;
};

export const getOneIngredientQueryOptions = ({ id }: { id: TIngredientId }) => {
  return queryOptions({
    queryKey: ["ingredient", id],
    queryFn: () => fetchData(id),
    staleTime: 0,
  });
};

export const useGetOneIngredient = (id: TIngredientId) => {
  const reactQuery = useQuery({
    ...getOneIngredientQueryOptions({ id }),
  });

  return reactQuery;
};
