import {
  Button,
  ButtonProps,
  Group,
  ThemeIcon,
  Tooltip,
  TooltipProps,
} from "@mantine/core";
import { RiQuestionLine } from "@remixicon/react";

type CustomButtonProps = {
  buttonProps: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
  tooltipProps: Omit<TooltipProps, "children">;
};

export const CustomButton = ({
  buttonProps = {
    size: "xs",
  },
  tooltipProps = {
    withArrow: true,
    label: "",
  },
}: CustomButtonProps) => {
  return (
    <Group gap={2}>
      <Button {...buttonProps} />
      <Tooltip {...tooltipProps}>
        <ThemeIcon variant="transparent">
          <RiQuestionLine color="var(--mantine-color-gray-5)" />
        </ThemeIcon>
      </Tooltip>
    </Group>
  );
};
