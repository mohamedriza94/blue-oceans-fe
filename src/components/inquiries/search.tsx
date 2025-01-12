import { DataSearch } from "@/shared/components/data-search";
import { MultiSelect, Select } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { stringToBoolean } from "@/shared/utils/string-to-boolean";
import { isDeletedOptions } from "@/shared/utils/is-deleted/is-deleted-options";
import { useGetInquiryAttributes } from "./hooks/use-get-inquiry-attributes";
import { TInquiryQueryParams } from "./hooks/use-get-many-inquiries-api";
import { TInquiry } from "./types/t";

type SearchMenusProps = {
  applyFilters: (newFilters: Partial<TInquiryQueryParams>) => void;
  resetFilters: () => void;
  isLoadingList: boolean;
  form: UseFormReturnType<
    TInquiryQueryParams,
    (values: TInquiryQueryParams) => TInquiryQueryParams
  >;
};

export const SearchInquiries = ({
  applyFilters,
  resetFilters,
  isLoadingList,
  form,
}: SearchMenusProps) => {
  const { data: attributes } = useGetInquiryAttributes();

  const statusOptions = [
    { value: "undefined", label: "All" },
    ...(attributes?.statuses || []).map((status) => ({
      value: status,
      label: status,
    })),
  ];

  const priorityOptions = [
    { value: "undefined", label: "All" },
    ...(attributes?.priorities || []).map((priority) => ({
      value: priority,
      label: priority,
    })),
  ];

  return (
    <DataSearch
      placeholder="Search by Email"
      onSearchChange={(value) => applyFilters({ email: value })}
      form={form}
      applyFilters={applyFilters}
      resetFilters={resetFilters}
      nameOfSearchField="label"
      isLoading={isLoadingList}
      elementSizes="xs"
    >
      {/* Status */}
      <Select
        size="xs"
        label={"Status"}
        placeholder="Select a Status"
        styles={{
          input: {
            textTransform: "capitalize",
          },
          option: {
            textTransform: "capitalize",
          },
        }}
        data={statusOptions}
        value={String(form.values.status)}
        onChange={(value) => {
          form.setFieldValue("status", value);
        }}
        key={form.key("status")}
      />

      {/* Priority */}
      <Select
        size="xs"
        label={"Priority"}
        placeholder="Select a Priority"
        styles={{
          input: {
            textTransform: "capitalize",
          },
          option: {
            textTransform: "capitalize",
          },
        }}
        tt={"capitalize"}
        data={priorityOptions}
        value={String(form.values.priority)}
        onChange={(value) => {
          form.setFieldValue("priority", value);
        }}
        key={form.key("priority")}
      />

      {/* Is Read */}
      <Select
        size="xs"
        label={"Read/Unread"}
        placeholder="Select Read/Unread"
        data={isDeletedOptions}
        value={String(form.values.isRead)}
        onChange={(value) => {
          form.setFieldValue("isRead", stringToBoolean(value));
        }}
        key={form.key("isRead")}
      />
    </DataSearch>
  );
};
