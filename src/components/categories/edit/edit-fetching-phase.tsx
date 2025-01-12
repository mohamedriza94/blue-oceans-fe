import { Loader, Text } from "@mantine/core";
import { Stack } from "@mantine/core";
import { TCategory } from "../types/category";
import { EditCategory } from "./edit";
import { useGetOneCategory } from "../hooks/use-get-one-category-api";

type EditCategoryFetchingPhaseProps = {
  categoryId: TCategory["_id"];
  closeModal: () => void;
};
export const EditCategoryFetchingPhase = ({
  closeModal,
  categoryId,
}: EditCategoryFetchingPhaseProps) => {
  const { data, isPending: isLoadingCategory } = useGetOneCategory({
    id: categoryId,
  });

  return (
    <>
      {isLoadingCategory ? (
        <Stack align="center" justify="center" p="xl">
          <Text>Getting Category</Text>
          <Loader />
        </Stack>
      ) : !data ? (
        <Stack align="center" justify="center" p="xl">
          <Text c="amaranthRed.5" fw={500}>
            No Category Found
          </Text>
        </Stack>
      ) : (
        <EditCategory category={data} closeModal={() => closeModal()} />
      )}
    </>
  );
};
