import { Flex, Text } from "@mantine/core";

export const CountItem = ({
  count,
  label,
}: {
  count: number;
  label: string;
}) => {
  return (
    <Flex align={"center"} justify={"space-between"} gap={"xs"}>
      <Text c={"blue.6"} fw={600} size="sm">
        {label}
      </Text>
      <Text c={"blue.5"} fw={400} size="sm">
        {count}
      </Text>
    </Flex>
  );
};
