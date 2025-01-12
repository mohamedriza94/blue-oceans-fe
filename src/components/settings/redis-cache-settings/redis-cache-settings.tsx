import { Stack } from "@mantine/core";
import { CustomButton } from "../common/custom-button";
import { useRedisCacheSettingsApi } from "../hooks/redis-cache-settings/use-redis-cache-settings-api";

export const RedisCacheSettings = () => {
  const { mutate: clearFullCache, isPending: isClearingFullCache } =
    useRedisCacheSettingsApi();

  return (
    <Stack>
      {/* Clear Full Cache */}
      <CustomButton
        buttonProps={{
          children: "Clear Full Cache",
          onClick: () => clearFullCache(),
          disabled: isClearingFullCache,
          loading: isClearingFullCache,
        }}
        tooltipProps={{
          label: "Erases all cached files in Redis",
          withArrow: true,
          position: "right-end",
        }}
      />
    </Stack>
  );
};
