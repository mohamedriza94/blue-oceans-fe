import {
  TNotification,
  useGetNotifications,
} from "@/shared/hooks/notifications/use-read-notifications-api";
import { useUpdateNotificationApi } from "@/shared/hooks/notifications/use-update-notification-api";
import { getIconComponent } from "@/shared/utils/dynamic-render-remix-icons";
import {
  ActionIcon,
  Flex,
  Indicator,
  Loader,
  Paper,
  Popover,
  ScrollAreaAutosize,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { RiNotification3Fill } from "@remixicon/react";
import Link from "next/link";

export const Notifications = () => {
  const { data, isLoading } = useGetNotifications();
  const { mutate, isPending } = useUpdateNotificationApi();

  const notifications: TNotification[] = data?.data.data || [];
  const unreadNotifications = notifications.filter(
    (notification) => notification.status === "unread",
  );

  return (
    <Popover position="bottom" withArrow shadow="md">
      <Popover.Target>
        {unreadNotifications.length > 0 ? (
          <Indicator offset={5} color="green.5" size={12} processing>
            <ActionIcon variant={"transparent"} color="blue.7">
              <RiNotification3Fill />
            </ActionIcon>
          </Indicator>
        ) : (
          <ActionIcon variant={"transparent"} color="blue.7">
            <RiNotification3Fill />
          </ActionIcon>
        )}
      </Popover.Target>

      <Popover.Dropdown>
        <ScrollAreaAutosize mah={400}>
          {isLoading ? (
            <Flex align={"center"} justify={"center"}>
              <Loader size={18} />
            </Flex>
          ) : (
            <Stack gap={"5"}>
              {notifications.map((not, idx) => (
                <Paper
                  key={idx + "notif"}
                  bg={not.status == "read" ? "" : "gray.1"}
                  p={"xs"}
                >
                  <Flex
                    align={"center"}
                    gap={"xs"}
                    style={{ cursor: "pointer" }}
                  >
                    <ThemeIcon radius={"xl"} size={"md"}>
                      {getIconComponent(not.icon, { size: 15 })}
                    </ThemeIcon>

                    <Stack gap={1} align="stretch">
                      <Text size="xs" fw={500}>
                        {not.title}
                      </Text>
                      <Text size="xs" fw={400}>
                        {not.description}
                      </Text>
                      {not.status == "unread" && (
                        <Flex align={"center"} justify={"space-between"}>
                          <Text
                            size="xs"
                            c={"blue.5"}
                            onClick={() => mutate(not._id ?? "")}
                          >
                            {isPending ? "Wait..." : "Mark as read"}
                          </Text>

                          <Text
                            size="xs"
                            c={"blue.5"}
                            component={Link}
                            href={not.link ?? ""}
                          >
                            OPEN
                          </Text>
                        </Flex>
                      )}
                    </Stack>
                  </Flex>
                </Paper>
              ))}
            </Stack>
          )}
        </ScrollAreaAutosize>
      </Popover.Dropdown>
    </Popover>
  );
};
