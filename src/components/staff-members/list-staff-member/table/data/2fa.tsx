import { Badge } from "@mantine/core";

export const Td2FA = ({
  twoFactorAuthEnabled,
}: {
  twoFactorAuthEnabled: boolean | undefined;
}) => {
  return (
    <Badge
      variant="light"
      color={twoFactorAuthEnabled ? "green.5" : "amaranthRed.5"}
      size="sm"
    >
      {twoFactorAuthEnabled ? "Enabled" : "Disabled"}
    </Badge>
  );
};
