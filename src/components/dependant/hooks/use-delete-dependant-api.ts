import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { TDependant } from "../table";

const postFn = async (dependantId: TDependant["_id"]) => {
  const response = await axiosPrivate.delete(
    `/dependant/delete/${dependantId}`,
  );
  return response.data;
};

type useDeleteDependantApiParams = {
  closeModal?: () => void;
};

export const useDeleteDependantApi = ({
  closeModal,
}: useDeleteDependantApiParams) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postFn,
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dependants-list"] });

      notifications.show({
        position: "top-center",
        message: "Deleted",
        color: "green.4",
      });

      closeModal && closeModal();
    },
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios", { position: "top-right" });
    },
  });

  return mutation;
};
