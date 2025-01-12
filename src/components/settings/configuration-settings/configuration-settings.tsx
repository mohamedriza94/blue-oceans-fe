import { Flex, Box, Loader } from "@mantine/core";
import { useGetSiteConfig } from "../hooks/configuration-settings/use-get-configuration-list-api";
import { renderInput } from "./render-input-fn";
import { useUpdateConfigurationControls } from "../hooks/configuration-settings/update-configuration/use-update-configuration-controls";

export const ConfigurationSettings = () => {
  const { data, isLoading } = useGetSiteConfig();
  const { handleUpdateConfig, isPending } = useUpdateConfigurationControls();

  return (
    <Flex align={"center"} wrap={"wrap"} gap={"sm"}>
      {isLoading ? (
        <Loader type="dots" color={"gray.5"} />
      ) : (
        data?.data.configurations.map((config) => (
          <Box key={config.keySlug}>
            {renderInput(config, handleUpdateConfig, isPending)}
          </Box>
        ))
      )}
    </Flex>
  );
};
