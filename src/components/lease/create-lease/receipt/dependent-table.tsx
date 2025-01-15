import { Table, Text } from "@mantine/core";
import { TLeaseAgreementData } from "../../hooks/create-lease/lease-agreement";
import { TDependant } from "@/components/dependant/table";
import dateFormat from "dateformat";
import { TdAvatar } from "@/components/dependant/table/data/avatar";

export const ReceiptDependantTable = ({
  dependents,
}: {
  dependents: TLeaseAgreementData["dependants"];
}) => {
  const columns = ["Name", "Relationship", "Contact Number", "Date of Birth"];

  return (
    <Table>
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
        {dependents.map((dependant: any, index: number) => (
          <Table.Tr key={index + dependant._id}>
            <Table.Td>
              <TdAvatar dependant={dependant} />
            </Table.Td>

            <Table.Td>
              <Text lineClamp={1} title={dependant.relationship}>
                {dependant.relationship}
              </Text>
            </Table.Td>

            <Table.Td>
              <Text lineClamp={1} title={dependant.contactNumber}>
                {dependant?.contactNumber || "N/A"}
              </Text>
            </Table.Td>

            <Table.Td>
              <Text
                lineClamp={1}
                title={dateFormat(dependant?.dateOfBirth, "mmm d, yyyy")}
              >
                {dateFormat(dependant?.dateOfBirth, "mmm d, yyyy")}
              </Text>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
