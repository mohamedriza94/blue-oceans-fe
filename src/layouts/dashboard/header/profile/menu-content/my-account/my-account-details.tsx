import { TStaffMember } from "@/shared/stores/staff-member-store";
import { Avatar, Indicator, rem, Stack, TextInput } from "@mantine/core";

type MyAccountDetailsProps = {
  myAccount: TStaffMember | undefined;
};

export const MyAccountDetails = ({ myAccount }: MyAccountDetailsProps) => {
  const inputStyles = {
    label: {
      color: "var(--mantine-color-darkBrown-6)",
      fontWeight: "600",
      fontSize: rem(16),
    },
  };

  return (
    <>
      <Stack align="center" gap="xs" mt="sm">
        <Indicator color="green.5" size={rem(15)} offset={12}>
          <Avatar size={rem(100)} src={myAccount?.avatar} />
        </Indicator>
      </Stack>

      <Stack gap="xs" mt="sm">
        <TextInput
          readOnly
          label="Roles"
          value={myAccount?.roles
            ?.map((role) => role.charAt(0).toUpperCase() + role.slice(1))
            .join(" | ")}
          tt="capitalize"
          styles={inputStyles}
        />
        <TextInput
          readOnly
          label="Email"
          value={myAccount?.email || ""}
          styles={inputStyles}
        />
        <TextInput
          readOnly
          label="Full Name"
          value={myAccount?.fullName || ""}
          styles={inputStyles}
        />
      </Stack>
    </>
  );
};
