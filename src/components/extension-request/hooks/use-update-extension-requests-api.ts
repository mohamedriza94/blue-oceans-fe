import { TExtensionRequest } from "@/components/lease/hooks/create-lease/lease-agreement";
import { axiosPrivate } from "@/shared/lib/axios/private";
import { ShowErrors } from "@/shared/utils/show-errors";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const postFN = async ({ _id, ...restData }: Partial<TExtensionRequest>) => {
  const response = await axiosPrivate.put(
    `/extension-request/update/${_id}`,
    restData,
  );
  return response.data;
};

export const useUpdateExtensionRequestApi = () => {
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
        message: "Extension request updated",
        color: "green.5",
      });
    },
  });

  return mutation;
};
