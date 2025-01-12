import * as RemixIcons from "@remixicon/react";

export const getIconComponent = (
  iconName: string | undefined,
  iconProps: React.ComponentProps<"svg"> & { size?: number | string } = {}
) => {
  if (!iconName) return null;

  const IconComponent = (RemixIcons as any)[iconName];
  return IconComponent ? <IconComponent {...iconProps} /> : null;
};
