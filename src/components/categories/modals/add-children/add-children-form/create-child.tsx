import { CategoryInputs } from "@/components/categories/common/inputs";
import { ActionButtons } from "@/components/categories/common/inputs/action-buttons";
import { useCreateCategoryForm } from "@/components/categories/hooks/create-category/use-create-category-form";
import { ActionIcon, Badge, Collapse, Flex, Stack, Text } from "@mantine/core";
import { useParentCategoryID } from "../store/use-current-parent-category";
import { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { RiArrowRightSLine } from "@remixicon/react";

type CreateChildCategoryProps = {
  count: number;
};

export const CreateChildCategory = ({ count }: CreateChildCategoryProps) => {
  const [opened, { toggle }] = useDisclosure(false);

  const { form, isPending, handleSubmit, files, setFiles, resetForm } =
    useCreateCategoryForm();

  const { parentCategoryID } = useParentCategoryID();
  useEffect(() => {
    form.setFieldValue("parentCategoryID", parentCategoryID ?? "");
  }, []);

  return (
    <Stack gap={"xs"}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex align={"center"} justify={"space-between"}>
          <Flex align="center" gap="xs">
            <ActionIcon
              onClick={toggle}
              radius="xl"
              title={opened ? "Minimize" : "Expand"}
            >
              <RiArrowRightSLine
                style={{ transform: `rotate(${opened ? "90deg" : "0deg"})` }}
              />
            </ActionIcon>

            <Text c={"gray.5"} fw={600}>
              Child Category
            </Text>

            <Badge circle color="gray.5" size="lg" variant="outline">
              {count}
            </Badge>
          </Flex>

          <ActionButtons
            isPending={isPending}
            resetFormFn={() => resetForm()}
          />
        </Flex>

        <Collapse in={opened}>
          <CategoryInputs
            files={files}
            form={form}
            isPending={isPending}
            setFiles={setFiles}
            parentDisabled={true}
          />
        </Collapse>
      </form>
    </Stack>
  );
};
