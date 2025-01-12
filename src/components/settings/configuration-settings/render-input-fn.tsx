import { Switch } from "@mantine/core";
import { TSiteConfiguration } from "../hooks/configuration-settings/use-get-configuration-list-api";

export const renderInput = (
  config: TSiteConfiguration,
  handleUpdateConfig: (id: string, value: boolean) => void,
  isPending: boolean,
) => {
  switch (config.dataType) {
    case "boolean":
      return (
        <Switch
          disabled={isPending}
          color="green"
          label={config.keyName}
          tt={"capitalize"}
          checked={config.value}
          onChange={(e) =>
            handleUpdateConfig(config._id, e.currentTarget.checked)
          }
        />
      );

    default:
      return null;
  }
};
