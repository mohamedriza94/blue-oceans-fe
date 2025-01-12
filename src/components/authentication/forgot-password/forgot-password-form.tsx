import {
  Button,
  Flex,
  rem,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import { useForgotPasswordForm } from "./hooks/use-forgot-password-form";
import Link from "next/link";
import { unprotectedPaths } from "@/shared/constants/paths";
import { RiArrowLeftSLine, RiFingerprintLine } from "@remixicon/react";

export function ForgotPasswordForm() {
  const { form, handleSubmit, isPending } = useForgotPasswordForm();

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
          <RiFingerprintLine color="#FFFFFF" />
        </ThemeIcon>
        <Text fw={700} fz={"h2"} c={"darkBrown.6"}>
          Forgot Password?
        </Text>
      </Stack>

      {/* Form */}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack justify={"space-between"} align="stretch" miw={300} gap={"lg"}>
          <TextInput
            key={form.key("email")}
            {...form.getInputProps("email")}
            label="Email"
            placeholder="Enter your email"
            radius="md"
            aria-label="Email"
            size={"md"}
            styles={{
              ...inputLabelStyle,
            }}
            disabled={isPending}
          />

          <Button
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
        Back to Login
      </Flex>
    </Stack>
  );
}
