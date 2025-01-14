import { Button, rem, Stack, Text } from "@mantine/core";
import { LoginFormInputs } from "./inputs";
import { useChiefOccupantLoginForm } from "./hooks/use-chief-occupant-login-form";

export function ChiefOccupantLoginForm() {
  const { form, handleSubmit, isPending } = useChiefOccupantLoginForm();

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
      <Text fw={600} fz={"h1"} c={"darkBrown.6"}>
        Occupant Login
      </Text>

      {/* Form */}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack justify={"space-between"} align="center" gap={"lg"}>
          <LoginFormInputs form={form} isPending={isPending} />

          <Button
            loading={isPending}
            disabled={isPending}
            color={"blue.6"}
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
