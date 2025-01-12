import { Divider, Flex, rem, Stack } from "@mantine/core";
import { useGetInquiries } from "./hooks/use-get-many-inquiries-api";
import { SearchInquiries } from "./search";
import { InquiryList } from "./list";
import { useState } from "react";
import { TInquiry } from "./types/t";
import { InquirySingleView } from "./single-view";

export const InquiriesComponent = () => {
  const { applyFilters, data, isPending, form, resetFilters, paginate, } =
    useGetInquiries();

  const [selectedInquiry, setSelectedInquiry] = useState<
    TInquiry["_id"] | null
  >(null);

  return (
    <Stack
      bg={"white"}
      flex={1}
      style={{ borderRadius: rem(20) }}
      gap={"xs"}
      justify="flex-start"
    >
      <SearchInquiries
        applyFilters={applyFilters}
        form={form}
        isLoadingList={isPending}
        resetFilters={resetFilters}
      />
      <Divider />

      <Flex flex={1} justify="flex-start" align="stretch">
        <InquiryList
          isLoading={isPending}
          inquiries={data?.inquiries ?? []}
          selectedInquiry={selectedInquiry}
          setSelectedInquiry={setSelectedInquiry}
          paginate={paginate}
          pagination={data?.pagination}
        />

        <InquirySingleView
          selectedInquiry={selectedInquiry}
          setSelectedInquiry={setSelectedInquiry}
        />
      </Flex>
    </Stack>
  );
};
