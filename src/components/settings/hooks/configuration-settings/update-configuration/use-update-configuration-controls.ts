import { useUpdateConfigurationApi } from "./use-update-configuration-api";

export const useUpdateConfigurationControls = () => {
  const { mutate, isPending } = useUpdateConfigurationApi();

  const handleUpdateConfig = (id: string, value: boolean) => {
    mutate({
      configurationID: id,
      data: {
        value,
      },
    });
  };

  return { handleUpdateConfig, isPending };
};
