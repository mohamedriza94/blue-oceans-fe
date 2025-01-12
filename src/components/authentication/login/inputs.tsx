import { unprotectedPaths } from "@/shared/constants/paths";
import {
  Checkbox,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import Link from "next/link";

type LoginFormInputsProps = {
  form: any;
  isPending: boolean;
};

export const LoginFormInputs = ({ form, isPending }: LoginFormInputsProps) => {
  const inputLabelStyle = {
    label: {
      fontWeight: 600,
      color: "var(--mantine-color-darkBrown-6)",
    },
  };

  return (
    <>
      <Stack justify={"space-between"} align="stretch" miw={300}>
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
        <PasswordInput
          key={form.key("password")}
          {...form.getInputProps("password")}
          label="Password"
          placeholder="Enter your password"
          radius="md"
          aria-label="Password"
          size={"md"}
          styles={{
            ...inputLabelStyle,
          }}
          disabled={isPending}
        />
      </Stack>

      <Text
        c={"amaranthRed.5"}
        component={Link}
        href={unprotectedPaths.forgotPassword}
        fz={"sm"}
        fw={600}
      >
        Forgot Your Password?
      </Text>

      <Checkbox
        radius={"sm"}
        size="sm"
        defaultChecked
        label="Stay Signed In"
        {...form.getInputProps("rememberMe", { type: "checkbox" })}
        disabled={isPending}
      />
    </>
  );
};
