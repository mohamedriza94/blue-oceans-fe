import { useGetStaffMembers } from "./hooks/use-get-staff-members";
import { StaffMemberTable } from "./list-staff-member/table";
import { AddStaffMemberModal } from "./add-staff-member/add-staff-member-modal";
import { SearchStaffMembers } from "./list-staff-member/search";

export function StaffMembersComponent() {
  const {
    applyFilters,
    paginate,
    resetFilters,
    isLoading,
    form,
    data,
    isError,
  } = useGetStaffMembers();

  return (
    <>
      <SearchStaffMembers
        applyFilters={applyFilters}
        resetFilters={resetFilters}
        isLoadingList={isLoading}
        form={form}
        customRightSection={<AddStaffMemberModal />}
      />

      <StaffMemberTable
        isLoading={isLoading}
        staffMembers={data?.data.data.staffMembers}
        pagination={data?.data.data.pagination}
        paginate={paginate}
        isError={isError}
      />
    </>
  );
}
