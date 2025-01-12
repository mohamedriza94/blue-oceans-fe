import { Box, Checkbox, Divider, Flex, ScrollArea, Stack } from "@mantine/core";
import { ListOptions } from "./options";
import { TInquiry } from "../types/t";
import { useElementSize } from "@mantine/hooks";
import { InquiryListSkeleton } from "./list-skeleton";
import { InquiryListSubjectAndDate } from "./blocks/subject-n-date";
import { InquiryListTop } from "./blocks/top";
import { useSelectInquiries } from "../hooks/use-select-inquiries";
import { useDelete } from "../hooks/delete/use-delete";
import { useUpdate } from "../hooks/update/use-update";
import { CustomPagination } from "@/shared/components/pagination";

type InquiryListProps = {
  isLoading: boolean;
  inquiries: TInquiry[];
  selectedInquiry: TInquiry["_id"] | null;
  setSelectedInquiry: (value: TInquiry["_id"]) => void;
  paginate: (type: "change-limit" | "paginate", value: number) => void;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export const InquiryList = ({
  inquiries,
  isLoading,
  selectedInquiry,
  setSelectedInquiry,
  paginate,
  pagination,
}: InquiryListProps) => {
  const { ref, height } = useElementSize();
  const { clearSelection, selectAll, checkedInquiries, toggleCheckbox } =
    useSelectInquiries();
  const { handleDelete, isDeleting } = useDelete();
  const { handleUpdate, isUpdating } = useUpdate();

  if (isLoading) return <InquiryListSkeleton />;

  return (
    <Stack align="stretch" gap={"xs"} p={"sm"} justify="flex-start" w={"50%"}>
      <ListOptions
        checkedInquiries={checkedInquiries}
        inquiryIDs={inquiries.map(({ _id }) => _id)}
        selectAll={selectAll}
        clearSelection={clearSelection}
        handleDelete={handleDelete}
        isDeleting={isDeleting}
        handleUpdate={handleUpdate}
        isUpdating={isUpdating}
      />

      <Box flex={1} ref={ref}>
        <ScrollArea type="auto" h={height} mih={150} offsetScrollbars>
          <Stack align="stretch" gap={0} justify="flex-start" h={"auto"}>
            {inquiries.map((inquiry, index) => (
              <>
                <Flex
                  key={inquiry._id}
                  align={"center"}
                  gap={"xs"}
                  bg={
                    selectedInquiry == inquiry._id
                      ? "amaranthRed.0"
                      : inquiry.isRead
                        ? ""
                        : "gray.0"
                  }
                  p={5}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <Checkbox
                    radius={"sm"}
                    size="xs"
                    color="amaranthRed.5"
                    checked={checkedInquiries.includes(inquiry._id)}
                    onChange={() => toggleCheckbox(inquiry._id)}
                  />

                  <Stack
                    align="stretch"
                    justify="flex-start"
                    flex={1}
                    gap={5}
                    onClick={() => setSelectedInquiry(inquiry._id)}
                  >
                    <InquiryListTop inquiry={inquiry} />

                    <InquiryListSubjectAndDate inquiry={inquiry} />
                  </Stack>
                </Flex>

                {inquiries.length - (index + 1) != 0 && <Divider />}
              </>
            ))}
          </Stack>
        </ScrollArea>
      </Box>

      {!isLoading && (
        <CustomPagination
          pagination={pagination}
          paginate={paginate}
          showLimitSetter
        />
      )}
    </Stack>
  );
};
