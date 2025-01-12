import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { Box, Button, Flex, Loader, rem, Switch } from "@mantine/core";
import { TwoFactorAuthentication } from "./two-factor-authentication";
import { TStaffMember } from "@/shared/stores/staff-member-store";
import { useUpdateMeForm } from "../../hooks/update-me/use-update-me";

type TwoFASwitchProps = {
  myAccount: TStaffMember | undefined;
};

export const TwoFASwitch = ({ myAccount }: TwoFASwitchProps) => {
  const { isPending, handleSubmit } = useUpdateMeForm();

  const handleSwitchChange = (checked: boolean) => {
    handleSubmit({
      twoFactorAuthEnabled: checked,
    });
  };

  return myAccount?.twoFactorAuthEnabled ? (
    <Flex align={"center"} justify={"flex-start"} gap={"xs"}>
      <Switch
        mt="md"
        checked={myAccount?.twoFactorAuthEnabled}
        style={{ cursor: "pointer" }}
        c="darkBrown.6"
        labelPosition="left"
        label="Two Factor Authentication"
        fw={600}
        size="sm"
        disabled={isPending}
        onChange={(event) => handleSwitchChange(event.currentTarget.checked)}
      />

      {isPending ? <Loader size={"xs"} mb={rem(-15)} /> : ""}
    </Flex>
  ) : (
    <Box>
      <CustomMantineModal
        size="auto"
        centered
        customTrigger={
          <Button variant="outline" size="xs">
            Activate 2FA
          </Button>
        }
      >
        <TwoFactorAuthentication />
      </CustomMantineModal>
    </Box>
  );
};
