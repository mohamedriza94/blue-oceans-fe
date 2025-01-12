import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation } from "@tanstack/react-query";
import { TMenuItem } from "../../types/menu-item";

const createMenuItemPostFn = async (data: Partial<TMenuItem>) => {
  const response = await axiosPrivate.post("/menu-item/create-item", data);
  return response.data;
};

export const useCreateMenuItemApi = () => {
  const mutation = useMutation({
    mutationFn: createMenuItemPostFn,
    retry: 1,
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios", { position: "top-center" });
    },
  });

  return mutation;
};
