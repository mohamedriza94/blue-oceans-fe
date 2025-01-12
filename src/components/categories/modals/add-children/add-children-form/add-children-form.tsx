import { createEmptyArray } from "@/shared/utils/create-empty-array";
import { Box, Divider, Flex, rem, Stack } from "@mantine/core";
import { CreateChildCategory } from "./create-child";

type AddChildrenFormProps = {
  childrenCount: number;
};

export const AddChildrenForm = ({ childrenCount }: AddChildrenFormProps) => {
  const elements = createEmptyArray(childrenCount);

  return (
    <Stack align="stretch" justify="flex-start" gap="md">
      {elements.map((_, idx) => (
        <>
          <Box
            component="span"
            key={idx + "child-category"}
            bg={"gray.1"}
            p={"md"}
            style={{
              borderRadius: rem(15),
            }}
          >
            <CreateChildCategory count={idx + 1} />
          </Box>

          {idx < elements.length - 1 && (
            <Flex justify="center">
              <Divider w={"95%"} color="amaranthRed.2" />
            </Flex>
          )}
        </>
      ))}
    </Stack>
  );
};
