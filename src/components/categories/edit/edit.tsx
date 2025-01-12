import { Box, Code, Flex, rem, Stack, Text } from "@mantine/core";
import { ActionButtons } from "../common/inputs/action-buttons";
import { CategoryInputs } from "../common/inputs";
import { TCategory } from "../types/category";
import { useEditCategoryForm } from "../hooks/edit-category/use-edit-category-form";
import { useEffect } from "react";

type EditCategoryProps = {
  category: TCategory;
  closeModal: () => void;
};

export const EditCategory = ({ category, closeModal }: EditCategoryProps) => {
  const {
    form,
    isPending,
    handleSubmit,
    isSuccess,
    resetForm,
    allFiles,
    setAllFiles,
  } = useEditCategoryForm(category);

  useEffect(() => {
    if (isSuccess) {
      // closeModal();
    }
  }, [isSuccess]);

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
            Edit Category
          </Text>
          <ActionButtons
            isPending={isPending}
            resetFormFn={() => resetForm()}
          />
        </Flex>

        <Stack>
          <Box>
            <Code color="blue.5" c={"white"} fw={600}>
              {category.categoryHierarchy?.split("/").join(" > ")}
            </Code>
          </Box>
          <CategoryInputs
            files={allFiles}
            form={form}
            isPending={isPending}
            setFiles={setAllFiles}
            omitCategoryIDsFromParentList={[category._id]}
          />
        </Stack>
      </form>
    </Stack>
  );
};
