import useBreadcrumbStore, {
  TBreadcrumb,
} from "@/shared/stores/breadcrumb-store";
import { getIconComponent } from "@/shared/utils/dynamic-render-remix-icons";
import { Anchor, Breadcrumbs, Flex, rem, Stack } from "@mantine/core";
import { RiArrowRightSLine } from "@remixicon/react";

export const CustomBreadcrumbs = () => {
  const { breadcrumbs } = useBreadcrumbStore();

  if (!breadcrumbs || !breadcrumbs.length) return <></>;

  return (
    <Stack align="start" justify="center">
      <Breadcrumbs
        style={{
          borderRadius: `0 ${rem(20)} ${rem(20)} 0`,
        }}
        bg={"#FFFFFF"}
        px={rem(10)}
        py={rem(1)}
        separator={
          <RiArrowRightSLine
            color="var(--mantine-color-amaranthRed-5)"
            size={16}
          />
        }
      >
        {breadcrumbs.map((breadcrumb: TBreadcrumb, index) => (
          <Anchor
            href={breadcrumb.href}
            key={index + breadcrumb.label}
            fz={"sm"}
            fw={400}
            style={{
              cursor: breadcrumb.href ? "pointer" : "auto",
            }}
            underline="never"
          >
            <Flex align={"center"} gap={rem(3)}>
              {getIconComponent(breadcrumb.icon, { size: 18 })}
              {breadcrumb.label}
            </Flex>
          </Anchor>
        ))}
      </Breadcrumbs>
    </Stack>
  );
};
