import { Stack } from "@mantine/core";
import { SearchExtensionRequest } from "./search";
import { useGetExtensionRequests } from "./hooks/use-read-extension-requests-api";
import { ExtensionRequestTable } from "./table";

export const ExtensionRequest = () => {
  const {
    applyFilters,
    data,
    isPending,
    isError,
    form,
    resetFilters,
    paginate,
  } = useGetExtensionRequests();

  return (
    <Stack>
      <SearchExtensionRequest
        applyFilters={applyFilters}
        form={form}
        isLoadingList={isPending}
        resetFilters={resetFilters}
      />

      <ExtensionRequestTable
        isLoading={isPending}
        extensionRequests={data?.data.data.extensionRequests}
        pagination={data?.data.data.pagination}
        paginate={paginate}
        isError={isError}
      />
    </Stack>
  );
};
