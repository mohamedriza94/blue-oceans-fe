import { Button, rem, Stack, Text } from "@mantine/core";
import { useLoginForm } from "./hooks/use-login-form";
import { LoginFormInputs } from "./inputs";

export function LoginForm() {
  const { form, handleSubmit, isPending } = useLoginForm();

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
      <Text fw={700} fz={"h1"} c={"darkBrown.6"}>
        Login
      </Text>

      {/* Form */}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack justify={"space-between"} align="center" gap={"lg"}>
          <LoginFormInputs form={form} isPending={isPending} />

          <Button
            loading={isPending}
            disabled={isPending}
            color={"amaranthRed.5"}
            fz={"md"}
            fw={600}
            miw={rem(150)}
            type={"submit"}
          >
            Sign In
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
