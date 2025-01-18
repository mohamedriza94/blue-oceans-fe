import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const postFN = async (extensionRequestId: string) => {
  const response = await axiosPrivate.post(`/lease/extend-lease`, {
    extensionRequestId,
  });
  return response.data;
};

export const useExtendLeaseApi = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postFN,
    retry: 1,
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios", { position: "top-center" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["extensionRequests-list"] });
      queryClient.invalidateQueries({ queryKey: ["extensionRequest"] });

      showNotification({
        message: "Extension request approved",
        color: "green.5",
      });
    },
  });

  return mutation;
};
