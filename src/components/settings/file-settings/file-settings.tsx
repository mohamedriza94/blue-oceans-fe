import { Flex } from "@mantine/core";
import { CustomButton } from "../common/custom-button";
import { useFlushOldTempFilesGetApi } from "../hooks/file-settings/use-flush-old-temp-files-api";

export const FileSettings = () => {
  const { mutate: flushOldTempFiles, isPending: isFlushingTokens } =
    useFlushOldTempFilesGetApi();

  return (
    <Flex align={"center"} wrap={"wrap"} justify={"flex-start"} gap={"xs"}>
      {/* Flush Tokens */}
      <CustomButton
        buttonProps={{
          children: "Flush Unused Files",
          onClick: () => flushOldTempFiles(),
          disabled: isFlushingTokens,
          loading: isFlushingTokens,
        }}
        tooltipProps={{
          label: "Flushes all old unused files",
          withArrow: true,
          position: "right-end",
        }}
      />
    </Flex>
  );
};
