import { Fieldset, Grid, TextInput } from "@mantine/core";
import { TOccupantLease } from "./hooks/use-read-lease-api";
import { fieldsetStyles } from "@/components/common/form-fieldset-style";
import dateFormat from "dateformat";

export const LeaseInfo = ({
  leaseData,
  isPending,
}: {
  leaseData: TOccupantLease;
  isPending: boolean;
}) => {
  return (
    <Fieldset legend="My Lease" styles={fieldsetStyles}>
      <Grid>
        <Grid.Col span={4}>
          <TextInput readOnly label={"Lease ID"} value={`#${leaseData._id}`} />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput readOnly label={"Lease Status"} value={leaseData.status} />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            readOnly
            label={"Ends on"}
            value={dateFormat(leaseData.endDate, "mmm d, yyyy")}
          />
        </Grid.Col>
      </Grid>
    </Fieldset>
  );
};
