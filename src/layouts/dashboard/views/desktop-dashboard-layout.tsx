import { AppShell, rem, Stack } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { DashboardSidebar } from "../sidebar";
import { DashboardHeader } from "../header";
import { CustomBreadcrumbs } from "@/shared/components/custom-breadcrumbs";

type DesktopDashboardLayoutProps = {
  children: React.ReactNode;
};

export const DesktopDashboardLayout = ({
  children,
}: DesktopDashboardLayoutProps) => {
  const [isMinimized, toggleMinimized] = useToggle([false, true]);

  return (
    <AppShell
      withBorder={false}
      header={{ height: rem(45) }}
      navbar={{
        width: isMinimized ? "100px" : "200px",
        breakpoint: 0,
      }}
    >
      <AppShell.Header>
        <DashboardHeader
          isMinimized={isMinimized}
          toggleMinimized={toggleMinimized}
        />
      </AppShell.Header>

      <AppShell.Navbar style={{ transition: "all .3s ease" }}>
        <DashboardSidebar isMinimized={isMinimized} />
      </AppShell.Navbar>

      <AppShell.Main h={"100vh"}>
        <Stack
          align="stretch"
          justify="flex-start"
          gap={0}
          pt={rem(3)}
          mah={"100%"}
          h={"100%"}
        >
          <CustomBreadcrumbs />
          <Stack align="stretch" p={10} flex={1}>
            {children}
          </Stack>
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
};
