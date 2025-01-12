import { Button, Stack, Text, ThemeIcon } from "@mantine/core";
import Link from "next/link";
import { RiUserFill } from "@remixicon/react";
import { unprotectedPaths } from "@/shared/constants/paths";

export function SelectUserForm() {
  return (
    <Stack
      bg={"#FFFFFF"}
      p={"lg"}
      align={"center"}
      justify={"space-between"}
      style={{
        borderRadius: "1.5rem",
      }}
      gap={"md"}
    >
      {/* Header */}
      <Stack align="center" justify="center" gap={"xs"}>
        <ThemeIcon color="blue.6" w={50} h={50}>
          <RiUserFill color="#FFFFFF" />
        </ThemeIcon>
        <Text fw={700} fz={"h2"} c={"darkBrown.6"}>
          I am a
        </Text>
      </Stack>

      {/* Form */}
      <Stack align="stretch" gap={"xs"}>
        <Button
          component={Link}
          href={unprotectedPaths.adminLogin}
          variant="outline"
        >
          Admin
        </Button>
        <Button
          component={Link}
          href={unprotectedPaths.chiefOccupantLogin}
          variant="outline"
        >
          Chief Occupant
        </Button>
      </Stack>
    </Stack>
  );
}
