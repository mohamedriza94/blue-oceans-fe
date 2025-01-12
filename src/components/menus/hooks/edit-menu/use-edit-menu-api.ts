import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TMenuItem } from "../../types/menu-item";

type TEditMenuPostFn = {
  menuId: TMenuItem["_id"];
  data: Partial<TMenuItem>;
};

const editMenuPostFn = async ({ menuId, data }: TEditMenuPostFn) => {
  const response = await axiosPrivate.put(
    `/menu-item/update-item/${menuId}`,
    data,
  );
  return response.data;
};

export const useEditMenuApi = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: editMenuPostFn,
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus-list"] });
    },
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios", { position: "top-center" });
    },
  });

  return mutation;
};
