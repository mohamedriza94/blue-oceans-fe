import { prefixOfUnprotectedPaths } from "@/shared/constants/paths";
import { useRouter } from "next/router";
import { DashboardLayout } from "./dashboard/dashboard-layout";
import { AuthenticationLayout } from "./authentication/authentication-layout";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useRouter();

  const isUnprotectedPath = pathname.startsWith(prefixOfUnprotectedPaths);
  const Layout = isUnprotectedPath ? AuthenticationLayout : DashboardLayout;

  return <Layout>{children}</Layout>;
};
