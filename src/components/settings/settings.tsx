import { Fieldset, rem, Stack, useMantineTheme } from "@mantine/core";
import { TokenSettings } from "./token-settings";
import { RedisCacheSettings } from "./redis-cache-settings";
import { ConfigurationSettings } from "./configuration-settings";
import { OtpSettings } from "./otp-settings";
import { FileSettings } from "./file-settings";

export const SettingsComponent = () => {
  const theme = useMantineTheme();
  const fieldsetStyles = {
    legend: {
      fontSize: theme.fontSizes.md,
      fontWeight: 600,
    },
  };

  return (
    <Stack
      bg={"#FFFFFF"}
      style={{ borderRadius: rem(20) }}
      gap={"md"}
      align="stretch"
      justify="flex-start"
      p={"md"}
    >
      <Fieldset legend="Tokens" radius={"md"} styles={fieldsetStyles}>
        <TokenSettings />
      </Fieldset>

      <Fieldset legend="Redis Cache" radius={"md"} styles={fieldsetStyles}>
        <RedisCacheSettings />
      </Fieldset>

      <Fieldset
        legend="One Time Passwords"
        radius={"md"}
        styles={fieldsetStyles}
      >
        <OtpSettings />
      </Fieldset>

      <Fieldset legend="Files" radius={"md"} styles={fieldsetStyles}>
        <FileSettings />
      </Fieldset>

      <Fieldset
        legend="Site Configuration"
        radius={"md"}
        styles={fieldsetStyles}
      >
        <ConfigurationSettings />
      </Fieldset>
    </Stack>
  );
};
