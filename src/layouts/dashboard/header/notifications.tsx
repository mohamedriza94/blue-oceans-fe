import { ActionIcon, Indicator } from "@mantine/core";
import { RiNotification3Fill } from "@remixicon/react";

export const Notifications = () => {
  return (
    <Indicator offset={5} color="green.5" size={12} processing>
      <ActionIcon variant={"transparent"} color="blue.7">
        <RiNotification3Fill />
      </ActionIcon>
    </Indicator>
  );
};
