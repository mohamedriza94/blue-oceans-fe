import { TMenuItem } from "@/components/menus/types/menu-item";
import { Text } from "@mantine/core";

type TdDisplayPositionProps = {
  displayPosition: TMenuItem["displayPosition"];
};

export const TdDisplayPosition = ({
  displayPosition,
}: TdDisplayPositionProps) => {
  return (
    <Text fw={600} c={"orange.5"}>
      {displayPosition}
    </Text>
  );
};
