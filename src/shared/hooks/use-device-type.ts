import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

type TDeviceType = boolean | undefined;

export const useDeviceType = () => {
  const mantineTheme = useMantineTheme();

  const isMobile: TDeviceType = useMediaQuery(
    `(max-width: ${mantineTheme.breakpoints.mobile})`,
  );
  const isTablet: TDeviceType = useMediaQuery(
    `(min-width: ${mantineTheme.breakpoints.mobile}) and (max-width: ${mantineTheme.breakpoints.tablet})`,
  );
  const isDesktop: TDeviceType = useMediaQuery(
    `(min-width: ${mantineTheme.breakpoints.desktop})`,
  );
  const isTabOrMobile: TDeviceType = useMediaQuery(
    `(max-width: ${mantineTheme.breakpoints.tablet})`,
  );

  return { isMobile, isTablet, isDesktop, isTabOrMobile };
};
