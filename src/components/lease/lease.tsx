import { Stack } from "@mantine/core";
import { SearchLease } from "./search";
import { useForm, UseFormReturnType } from "@mantine/form";

export const LeaseComponent = () => {
  const dummyForm: UseFormReturnType<any, (values: any) => any> = useForm({
    initialValues: {
      label: "",
    },
  });

  return (
    <Stack>
      <SearchLease
        applyFilters={() => {}}
        resetFilters={() => {}}
        isLoadingList={false}
        form={dummyForm}
      />
    </Stack>
  );
};
