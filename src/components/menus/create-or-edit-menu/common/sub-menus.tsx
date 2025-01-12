import { Fieldset, rem, Stack, useMantineTheme } from "@mantine/core";

type SubMenusProps = {
  children: React.ReactNode;
};

export const SubMenus = ({ children }: SubMenusProps) => {
  const theme = useMantineTheme();
  return (
    <Fieldset
      mt={"lg"}
      bd={"none"}
      radius={rem(20)}
      legend="Sub-Menus"
      variant="filled"
      bg={"amaranthRed.0"}
      styles={{
        legend: {
          fontWeight: 600,
          fontSize: theme.fontSizes.lg,
          color: "var(--mantine-color-amaranthRed-5)",
        },
      }}
    >
      <Stack gap={"xs"}>{children}</Stack>
    </Fieldset>
  );
};
