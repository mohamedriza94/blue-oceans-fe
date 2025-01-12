import { Flex, rem, Stack, Text } from "@mantine/core";
import { ActionButtons } from "../common/inputs/action-buttons";
import { useCreateCategoryForm } from "../hooks/create-category/use-create-category-form";
import { CategoryInputs } from "../common/inputs";

export const CreateCategory = () => {
  const { form, isPending, handleSubmit, files, setFiles, resetForm } =
    useCreateCategoryForm();

  return (
    <Stack
      gap={"xs"}
      align="stretch"
      bg={"#FFFFFF"}
      style={{ borderRadius: rem(20) }}
      p={"lg"}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex align={"center"} justify={"space-between"}>
          <Text c={"darkBrown.6"} fw={700} fz={"h2"}>
            Create Category
          </Text>
          <ActionButtons
            isPending={isPending}
            resetFormFn={() => resetForm()}
          />
        </Flex>

        <CategoryInputs
          files={files}
          form={form}
          isPending={isPending}
          setFiles={setFiles}
        />
      </form>
    </Stack>
  );
};
