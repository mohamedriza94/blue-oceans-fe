import { Flex } from "@mantine/core";
import { CustomButton } from "../common/custom-button";
import { useFlushOtpsGetApi } from "../hooks/otp-settings/use-flush-otps-api";

export const OtpSettings = () => {
  const { mutate: flushOtps, isPending: isFlushingOtps } = useFlushOtpsGetApi();

  return (
    <Flex align={"center"} wrap={"wrap"} justify={"flex-start"} gap={"xs"}>
      {/* Flush Tokens */}
      <CustomButton
        buttonProps={{
          children: "Flush OTPs",
          onClick: () => flushOtps(),
          disabled: isFlushingOtps,
          loading: isFlushingOtps,
        }}
        tooltipProps={{
          label: "Flushes all used/unused OTPs that are expired",
          withArrow: true,
          position: "right-end",
        }}
      />
    </Flex>
  );
};
