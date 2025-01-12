import {
  Button,
  Flex,
  PasswordInput,
  rem,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { useResetPasswordForm } from "./hooks/use-reset-password-form";
import { RiArrowLeftSLine, RiKeyLine } from "@remixicon/react";
import Link from "next/link";
import { unprotectedPaths } from "@/shared/constants/paths";

export function ResetPasswordForm() {
  const { form, handleSubmit, isPending } = useResetPasswordForm();

  const inputLabelStyle = {
    label: {
      fontWeight: 600,
      color: "var(--mantine-color-darkBrown-6)",
    },
  };

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
        <ThemeIcon color="amaranthRed.5">
          <RiKeyLine color="#FFFFFF" size={25} />
        </ThemeIcon>
        <Text fw={700} fz={"h2"} c={"darkBrown.6"}>
          Reset Password
        </Text>
      </Stack>

      {/* Form */}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack
          justify={"space-between"}
          align="stretch"
          miw={300}
          maw={300}
          gap={"lg"}
        >
          <PasswordInput
            key={form.key("password")}
            {...form.getInputProps("password")}
            label="New Password"
            placeholder="Enter your new password"
            radius="md"
            aria-label="New Password"
            size={"md"}
            styles={{
              ...inputLabelStyle,
            }}
            disabled={isPending}
          />
          <PasswordInput
            key={form.key("confirmedPassword")}
            {...form.getInputProps("confirmedPassword")}
            label="Confirm Password"
            placeholder="Confirm new password"
            radius="md"
            aria-label="Confirm Password"
            size={"md"}
            styles={{
              ...inputLabelStyle,
            }}
            disabled={isPending}
          />

          <Button
            mt={rem(5)}
            loading={isPending}
            disabled={isPending}
            color={"amaranthRed.5"}
            fz={"md"}
            fw={600}
            miw={rem(150)}
            type={"submit"}
          >
            Submit
          </Button>
        </Stack>
      </form>

      <Flex
        c={"amaranthRed.5"}
        component={Link}
        href={unprotectedPaths.login}
        fz={"sm"}
        fw={600}
        align={"center"}
        style={{ textDecoration: "none" }}
      >
        <RiArrowLeftSLine />
        Go to Login
      </Flex>
    </Stack>
  );
}
