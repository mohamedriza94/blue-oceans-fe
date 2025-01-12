import { ActionIcon } from "@mantine/core";
import { RiFullscreenExitLine, RiFullscreenLine } from "@remixicon/react";
import { useState } from "react";

export const FullScreenToggle = () => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen((prev) => !prev);
  };

  return (
    <ActionIcon onClick={toggleFullscreen} variant="transparent" color="gray.7">
      {isFullscreen ? <RiFullscreenExitLine /> : <RiFullscreenLine />}
    </ActionIcon>
  );
};
