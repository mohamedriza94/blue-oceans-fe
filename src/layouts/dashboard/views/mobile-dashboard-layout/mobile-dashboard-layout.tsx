import { ScrollArea, Stack } from "@mantine/core";
import { MobileHeader } from "./mobile-header";
import { MobileFooter } from "./mobile-footer";

type MobileDashboardLayoutProps = {
  children: React.ReactNode;
};

export const MobileDashboardLayout = ({
  children,
}: MobileDashboardLayoutProps) => {
  return (
    <Stack
      h={"100vh"}
      w={"100%"}
      bg={"amaranthRed.6"}
      align="stretch"
      justify="space-between"
    >
      <MobileHeader />
      <ScrollArea p={"sm"} flex={1}>
        {children}
      </ScrollArea>
      <MobileFooter />
    </Stack>
  );
};
