import { Button, Checkbox, Flex } from "@mantine/core";
import { RiDeleteBin5Line } from "@remixicon/react";
import { TInquiry } from "../types/t";
import { PriorityUpdateMenu } from "./priority-update-menu";

type ListOptionsProps = {
  checkedInquiries: TInquiry["_id"][];
  inquiryIDs: TInquiry["_id"][];
  selectAll: (ids: TInquiry["_id"][]) => void;
  clearSelection: () => void;
  handleDelete: (inquiryIDs: TInquiry["_id"][]) => void;
  isDeleting: boolean;
  handleUpdate: (inquiries: Partial<TInquiry>[]) => void;
  isUpdating: boolean;
};

export const ListOptions = ({
  checkedInquiries,
  inquiryIDs,
  selectAll,
  clearSelection,
  handleDelete,
  isDeleting,
  handleUpdate,
  isUpdating,
}: ListOptionsProps) => {
  const isAllSelected = checkedInquiries.length === inquiryIDs.length;
  const isIntermediate =
    checkedInquiries.length > 0 && checkedInquiries.length < inquiryIDs.length;
  const isDisabledControls =
    checkedInquiries.length === 0 || isDeleting || isUpdating;

  const handleCheckboxChange = () => {
    if (isAllSelected || isIntermediate) {
      clearSelection();
    } else {
      selectAll(inquiryIDs);
    }
  };

  const handleDeleteClick = () => {
    handleDelete(checkedInquiries);
    clearSelection();
  };

  const handleUpdateClick = (payload: Partial<TInquiry>) => {
    const updatedPayload = checkedInquiries.map((id) => ({
      ...payload,
      _id: id,
    }));
    handleUpdate(updatedPayload);
    clearSelection();
  };

  return (
    <Flex justify={"space-between"} gap={"xs"} px={5} align={"center"}>
      <Checkbox
        color="amaranthRed.5"
        size="xs"
        label="Select All"
        radius={"sm"}
        checked={isAllSelected}
        indeterminate={isIntermediate}
        onChange={handleCheckboxChange}
      />

      <Flex gap={"xs"} align={"center"}>
        <PriorityUpdateMenu
          disabled={isDisabledControls}
          checkedInquiries={checkedInquiries}
          loading={isUpdating}
          onPriorityClick={handleUpdateClick}
        />
        {/* <StatusUpdateMenu
          disabled={isDisabledControls}
          checkedInquiries={checkedInquiries}
          loading={isUpdating}
          onStatusClick={handleUpdateClick}
        /> */}
        <Button
          variant="outline"
          size="compact-xs"
          color="gray.6"
          leftSection={<RiDeleteBin5Line size={15} />}
          disabled={isDisabledControls}
          loading={isDeleting}
          onClick={handleDeleteClick}
        >
          Delete
        </Button>
      </Flex>
    </Flex>
  );
};
