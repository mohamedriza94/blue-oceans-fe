import { Table, Text } from "@mantine/core";
import {
  TLeaseAgreementData,
  TRentSlot,
} from "../../hooks/create-lease/lease-agreement";
import dateFormat from "dateformat";
import { TdAvatar } from "@/components/dependant/table/data/avatar";

export const ReceiptPaymentsTable = ({
  rentPayments,
}: {
  rentPayments: TLeaseAgreementData["rentSlots"];
}) => {
  const columns = ["Due Date", "Amount (USD)", "Payment Status"];

  return (
    <Table align="center">
      <Table.Thead>
        <Table.Tr>
          {columns.map((column) => (
            <Table.Th fw={600} fz={"md"}>
              {column}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {rentPayments.map((rent: TRentSlot, index: number) => (
          <Table.Tr key={index + rent._id}>
            <Table.Td>
              <Text
                lineClamp={1}
                title={dateFormat(rent?.dueDate, "mmm d, yyyy")}
              >
                {dateFormat(rent?.dueDate, "mmm d, yyyy")}
              </Text>
            </Table.Td>

            <Table.Td>
              <Text lineClamp={1} title={`$${rent.amount}`}>
                ${rent.amount}
              </Text>
            </Table.Td>

            <Table.Td>
              <Text lineClamp={1}>{rent.paymentStatus}</Text>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
