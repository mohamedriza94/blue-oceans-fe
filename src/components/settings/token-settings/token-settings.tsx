import { Flex } from "@mantine/core";
import { CustomButton } from "../common/custom-button";
import { useFlushTokensGetApi } from "../hooks/token-settings/use-flush-blacklisted-tokens-api";

export const TokenSettings = () => {
  const { mutate: flushTokens, isPending: isFlushingTokens } =
    useFlushTokensGetApi();

  return (
    <Flex align={"center"} wrap={"wrap"} justify={"flex-start"} gap={"xs"}>
      {/* Flush Tokens */}
      <CustomButton
        buttonProps={{
          children: "Flush Tokens",
          onClick: () => flushTokens(),
          disabled: isFlushingTokens,
          loading: isFlushingTokens,
        }}
        tooltipProps={{
          label: "Flushes all blacklisted tokens",
          withArrow: true,
          position: "right-end",
        }}
      />
    </Flex>
  );
};
