import { Button, PinInput, rem, Stack, Text, ThemeIcon } from "@mantine/core";
import { useGetOtpForm } from "./hooks/get-otp/use-get-otp";
import { useActivate2FAForm } from "./hooks/activate-2fa/use-2fa-form";
import { RiCheckboxCircleLine } from "@remixicon/react";

export const TwoFactorAuthentication = () => {
  const {
    handleSendOtp,
    isPending: isSendingOTP,
    isSuccess,
    countdown,
    email,
  } = useGetOtpForm();

  const {
    form,
    handleSubmit,
    isPending: isActivating2FA,
    isSuccess: is2FAActivated,
  } = useActivate2FAForm();

  const isLoading = isActivating2FA || isSendingOTP;

  return (
    <Stack align="stretch" justify="flex-start" gap="sm">
      <Text c="darkBrown.6" fw={700} fz="h2" ta="center">
        Two Factor Authentication
      </Text>

      {is2FAActivated ? (
        <Stack align="center" gap="lg" justify="center" mt="xl">
          <ThemeIcon radius={100} size={60} bg="green.4">
            <RiCheckboxCircleLine size="100%" />
          </ThemeIcon>

          <Stack align="center" gap="xs">
            <Text c="darkBrown.6" fz="xl" fw={700}>
              Successful
            </Text>
            <Text c="darkBrown.6" fw={400}>
              Two-Factor Authentication has been activated
            </Text>
          </Stack>
        </Stack>
      ) : (
        <>
          {isSuccess && (
            <Text c="darkBrown.6" fw={400} fz="sm" ta="center">
              We've sent an OTP to{" "}
              <Text component="span" c="darkBrown.6" fw={600} fz="sm">
                {email}
              </Text>
            </Text>
          )}

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack align="stretch" gap="lg">
              <Stack align="center" gap={rem(5)}>
                <Text fz="sm" fw={500} c="darkBrown.6">
                  ENTER OTP
                </Text>
                <PinInput
                  disabled={isLoading}
                  length={6}
                  type="number"
                  {...form.getInputProps("otp")}
                />
              </Stack>

              <Stack align="stretch" gap="xs">
                <Button
                  disabled={isLoading}
                  type="submit"
                  loading={isActivating2FA}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="compact-sm"
                  onClick={handleSendOtp}
                  loading={isSendingOTP}
                  disabled={isLoading || countdown > 0}
                >
                  {countdown > 0 ? `Resend OTP in ${countdown}s` : "Resend OTP"}
                </Button>
              </Stack>
            </Stack>
          </form>
        </>
      )}
    </Stack>
  );
};
