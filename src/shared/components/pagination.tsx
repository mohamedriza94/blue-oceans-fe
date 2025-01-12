import { Flex, Pagination, Select } from "@mantine/core";

type CustomPaginationProps = {
  paginate: (type: "change-limit" | "paginate", value: number) => void;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  showLimitSetter?: boolean;
};

export const CustomPagination = ({
  paginate,
  pagination,
  showLimitSetter,
}: CustomPaginationProps) => {
  return (
    <Flex align={"center"} justify={"space-between"} gap={"xs"}>
      {showLimitSetter && (
        <Select
          size="xs"
          data={[
            { value: "5", label: "Show 5 Records" },
            { value: "10", label: "Show 10 Records" },
            { value: "20", label: "Show 20 Records" },
          ]}
          value={pagination.limit.toString()}
          onChange={(value) => {
            paginate("change-limit", Number(value));
            paginate("paginate", 1);
          }}
        />
      )}

      <Pagination
        total={pagination?.totalPages ?? 0}
        size={"sm"}
        onChange={(page) => paginate("paginate", page)}
        value={Number(pagination.page)}
        withEdges
      />
    </Flex>
  );
};
