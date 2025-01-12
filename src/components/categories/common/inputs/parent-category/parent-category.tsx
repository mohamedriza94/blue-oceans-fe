import { fieldsetStyles } from "@/components/common/form-fieldset-style";
import {
  Code,
  Fieldset,
  Flex,
  Grid,
  Image,
  rem,
  Stack,
  Text,
} from "@mantine/core";
import { SelectParentCategory } from "./select-parent-category";
import { UseFormReturnType } from "@mantine/form";
import { TCategory } from "@/components/categories/types/category";
import { useGetOneCategory } from "@/components/categories/hooks/use-get-one-category-api";
import { showDefaultImage } from "@/shared/utils/show-default-image";
import { ParentCategorySkeleton } from "./parent-category-skeleton";

type ParentCategoryProps = {
  form: UseFormReturnType<TCategory, (values: TCategory) => TCategory>;
  isPending: boolean;
  parentDisabled?: boolean;
  omitCategoryIDsFromParentList?: TCategory["_id"][];
};

export const ParentCategory = ({
  form,
  isPending,
  parentDisabled,
  omitCategoryIDsFromParentList = [],
}: ParentCategoryProps) => {
  const { data: categoryData, isPending: isLoadingCategory } =
    useGetOneCategory({
      id: form.values.parentCategoryID,
    });

  return (
    <Grid.Col>
      <Fieldset
        legend="Parent Category (Optional)"
        styles={fieldsetStyles}
        variant="filled"
        disabled={isPending}
      >
        <SelectParentCategory
          setValue={(value) => form.setFieldValue("parentCategoryID", value)}
          value={form.values.parentCategoryID}
          disabled={parentDisabled}
          omitCategoryIDsFromParentList={omitCategoryIDsFromParentList}
        />

        {form.values.parentCategoryID && isLoadingCategory ? (
          <ParentCategorySkeleton />
        ) : (
          categoryData && (
            <Flex
              align={"center"}
              justify={"flex-start"}
              gap={"xs"}
              mt={"md"}
              style={{
                borderRadius: rem(20),
              }}
              bg={"white"}
            >
              <Image
                src={showDefaultImage(categoryData?.images ?? [])}
                radius={"lg"}
                maw={200}
                mah={150}
              />

              <Stack gap={5} align="start" justify="flex-start" p={"5"}>
                <Text fw={600} c={"gray.9"}>
                  {categoryData.name}
                </Text>
                <Text fw={400} c={"gray.9"}>
                  {categoryData.shortDescription}
                </Text>
                <Text
                  fw={500}
                  c={categoryData.isActive ? "green.5" : "amaranthRed.5"}
                >
                  {categoryData.isActive ? "Active" : "Inactive"}
                </Text>
                <Code color="amaranthRed.5" c={"white"} fw={600}>
                  {categoryData.categoryHierarchy?.split("/").join(" > ")}
                </Code>
              </Stack>
            </Flex>
          )
        )}
      </Fieldset>
    </Grid.Col>
  );
};
