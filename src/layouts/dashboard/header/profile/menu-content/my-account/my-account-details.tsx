import { TChiefOccupant } from "@/components/chief-occupant/table";
import { Avatar, Indicator, rem, Stack, TextInput } from "@mantine/core";

type MyAccountDetailsProps = {
  myAccount: TChiefOccupant | undefined;
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
        <Indicator
          color={myAccount?.status == "Active" ? "green.5" : "red.5"}
          size={rem(15)}
          offset={12}
        >
          <Avatar size={rem(100)} src={myAccount?.image} />
        </Indicator>
      </Stack>

      <Stack gap="xs" mt="sm">
        <TextInput
          readOnly
          label="Apartment"
          value={myAccount?.apartmentId?.identification || "NA"}
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
        <TextInput
          readOnly
          label="Contact Number"
          value={myAccount?.contactNumber || ""}
          styles={inputStyles}
        />
      </Stack>
    </>
  );
};
