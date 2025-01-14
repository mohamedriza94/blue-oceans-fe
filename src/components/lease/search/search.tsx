import { UseFormReturnType } from "@mantine/form";
import { DataSearch } from "@/shared/components/data-search";
import { CreateLeaseModal } from "../create-lease/create-lease-modal";

type TProps = {
  applyFilters: (newFilters: Partial<any>) => void;
  resetFilters: () => void;
  isLoadingList: boolean;
  form: UseFormReturnType<any, (values: any) => any>;
};

export const SearchLease = ({
  applyFilters,
  resetFilters,
  isLoadingList,
  form,
}: TProps) => {
  return (
    <DataSearch
      placeholder="Search by Chief Occupant Email"
      onSearchChange={(value) => applyFilters({ identification: value })}
      form={form}
      applyFilters={applyFilters}
      resetFilters={resetFilters}
      nameOfSearchField="label"
      isLoading={isLoadingList}
      elementSizes="xs"
      customRightSection={<CreateLeaseModal />}
    ></DataSearch>
  );
};
