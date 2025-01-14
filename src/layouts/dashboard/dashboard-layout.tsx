import { useDeviceType } from "@/shared/hooks/use-device-type";
import { DesktopDashboardLayout } from "./views/desktop-dashboard-layout";
import { MobileDashboardLayout } from "./views/mobile-dashboard-layout";
import { useUserTypeRedirect } from "@/shared/hooks/use-user-type-redirect";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  useUserTypeRedirect();
  const dt = useDeviceType();

  return dt.isDesktop ? (
    <DesktopDashboardLayout>{children}</DesktopDashboardLayout>
  ) : dt.isTabOrMobile ? (
    <MobileDashboardLayout>{children}</MobileDashboardLayout>
  ) : (
    <MobileDashboardLayout>{children}</MobileDashboardLayout>
  );
};
