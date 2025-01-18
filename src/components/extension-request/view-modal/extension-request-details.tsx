import {
  Button,
  Flex,
  Grid,
  Group,
  Loader,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useGetOneExtensionRequest } from "../hooks/use-read-one-extension-requests-api";
import { TExtensionRequestResponse } from "../hooks/use-read-extension-requests-api";
import { TdAvatar } from "@/components/chief-occupant/table/data/avatar";
import { TChiefOccupant } from "@/components/chief-occupant/table";
import dateFormat from "dateformat";
import { ENUMExtRequest } from "@/components/co/lease/create-extension-request/hooks/use-create-extension-request-api";
import { useUpdateExtensionRequestApi } from "../hooks/use-update-extension-requests-api";
import { useExtendLeaseApi } from "../hooks/use-extend-lease-api";

export const ExtensionRequestDetails = ({
  extensionRequestId,
}: {
  extensionRequestId: string;
}) => {
  const { data, isLoading } = useGetOneExtensionRequest(extensionRequestId);
  const { mutate, isPending } = useUpdateExtensionRequestApi();
  const { mutate: handleExtend, isPending: isExtending } = useExtendLeaseApi();

  const requestData: TExtensionRequestResponse | null = data?.data.data ?? null;

  return (
    <Stack>
      {isLoading ? (
        <Flex p={"xl"} align={"center"} justify={"center"}>
          <Loader />
        </Flex>
      ) : requestData ? (
        <Grid>
          <Grid.Col span={12}>
            <TdAvatar
              occupant={
                {
                  ...requestData?.leaseId.chiefOccupantId,
                  email: `${requestData.leaseId.chiefOccupantId.email} | ${requestData.leaseId.chiefOccupantId.contactNumber}`,
                } as unknown as TChiefOccupant
              }
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Requested At"
              readOnly
              value={dateFormat(requestData.requestedAt, "mmm d, yyyy")}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Extend Upto"
              readOnly
              value={dateFormat(requestData.requestedEndDate, "mmm d, yyyy")}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput label="Status" readOnly value={requestData.status} />
          </Grid.Col>
          <Grid.Col span={12}>
            <Textarea label="Reason" readOnly value={requestData?.reason} />
          </Grid.Col>

          {requestData.status == ENUMExtRequest.Pending ? (
            <Grid.Col>
              <Group grow>
                <Button
                  size="xs"
                  color="amaranthRed.5"
                  disabled={isLoading || isPending || isExtending}
                  loading={isPending}
                  onClick={() =>
                    mutate({
                      _id: extensionRequestId,
                      status: ENUMExtRequest.Rejected,
                    })
                  }
                >
                  Reject
                </Button>
                <Button
                  size="xs"
                  color="green.5"
                  disabled={isLoading || isPending || isExtending}
                  loading={isExtending}
                  onClick={() => handleExtend(extensionRequestId)}
                >
                  Accept
                </Button>
              </Group>
            </Grid.Col>
          ) : (
            ""
          )}
        </Grid>
      ) : (
        <Flex p={"xl"} align={"center"} justify={"center"}>
          Extension Request Not Found
        </Flex>
      )}
      <Grid></Grid>
    </Stack>
  );
};
