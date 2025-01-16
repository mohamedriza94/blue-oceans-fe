import {
  Avatar,
  Button,
  Fieldset,
  Flex,
  Grid,
  Image,
  rem,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { TLeaseAgreementData } from "../../hooks/create-lease/lease-agreement";
import dateFormat from "dateformat";
import { showDefaultImage } from "@/shared/utils/show-default-image";
import { ReceiptDependantTable } from "./dependent-table";
import { ReceiptPaymentsTable } from "./rent-payments-table";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useEffect, useRef } from "react";

type TProps = {
  leaseData: TLeaseAgreementData | null;
  autoDownload?: boolean;
  title?: string;
};

export const Receipt = ({
  leaseData,
  autoDownload = true,
  title = "Lease Agreement Details",
}: TProps) => {
  const pdfRef = useRef<HTMLDivElement>(null);

  const fieldsetStyles = {
    legend: {
      fontSize: rem(18),
      color: "var(--mantine-color-blue-6)",
      fontWeight: 500,
    },
  };

  const downloadPDF = async () => {
    const element = pdfRef.current;
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("lease-agreement-details.pdf");
  };

  useEffect(() => {
    const download = async () => {
      await downloadPDF();
    };
    if (autoDownload) {
      download();
    }
  }, []);

  return (
    <Stack p={"xl"}>
      <Button mt={"md"} onClick={downloadPDF} color="blue" variant="light">
        Download as PDF
      </Button>

      <Stack ref={pdfRef}>
        <Title c={"blue.6"}>{title}</Title>
        <Stack align="stretch" gap={"md"}>
          <Fieldset
            legend="Lease Info."
            styles={fieldsetStyles}
            variant="filled"
          >
            <Grid>
              <Grid.Col span={3}>
                <TextInput
                  label="Lease ID"
                  value={`#${leaseData?.lease?._id}`}
                  readOnly
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                  label="Rent Paymant Schedule"
                  value={leaseData?.lease?.paymentSchedule}
                  readOnly
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                  label="From"
                  value={dateFormat(leaseData?.lease?.startDate, "mmm d, yyyy")}
                  readOnly
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                  label="To"
                  value={dateFormat(leaseData?.lease?.endDate, "mmm d, yyyy")}
                  readOnly
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  label="Security Deposit (USD)"
                  value={`$${leaseData?.lease?.securityDepositInUSD}`}
                  readOnly
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  label="Base Rent Amount (USD)"
                  value={`$${leaseData?.lease?.rentAmountInUSD}`}
                  readOnly
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  label="Status"
                  value={leaseData?.lease?.status}
                  readOnly
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Fieldset legend="Terms and Conditions">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: leaseData?.lease?.termsAndConditions ?? "",
                    }}
                  />
                </Fieldset>
              </Grid.Col>
            </Grid>
          </Fieldset>

          <Fieldset
            legend="Parking Info."
            styles={fieldsetStyles}
            variant="filled"
          >
            <Grid>
              <Grid.Col span={3}>
                <TextInput
                  label="Number of Parking Slots"
                  value={`1 free & ${Number(leaseData?.parkingSlotNumbers?.length) - 1} Additional Slots`}
                  readOnly
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                  label="Price Per Additional Parking Slot (USD)"
                  value={`$${
                    Number(leaseData?.parkingSlotCharges) /
                    (Number(leaseData?.parkingSlotNumbers?.length) - 1)
                  }`}
                  readOnly
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                  label="Total Price for Additional Parking Slots"
                  value={`$${leaseData?.parkingSlotCharges}`}
                  readOnly
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  label="All of your Parking Slots"
                  value={leaseData?.parkingSlotNumbers?.join("         ")}
                  readOnly
                />
              </Grid.Col>
            </Grid>
          </Fieldset>

          <Fieldset
            legend="Chief Occupant Info."
            styles={fieldsetStyles}
            variant="filled"
          >
            <Flex align={"center"} gap={"md"}>
              <Avatar src={leaseData?.chiefOccupant?.image} size={"xl"} />

              <Stack gap={"5"}>
                <Text fw={600}>{leaseData?.chiefOccupant?.fullName}</Text>
                <Text fw={400}>{leaseData?.chiefOccupant?.email}</Text>
                <Text fw={400}>{leaseData?.chiefOccupant?.contactNumber}</Text>
                <Text fw={600}>{leaseData?.chiefOccupant?.status}</Text>
              </Stack>
            </Flex>

            <Fieldset mt={"lg"} legend="Dependents" variant="filled">
              <ReceiptDependantTable dependents={leaseData?.dependants ?? []} />
            </Fieldset>
          </Fieldset>

          <Fieldset
            legend="Building Info."
            styles={fieldsetStyles}
            variant="filled"
          >
            <Grid>
              <Grid.Col span={6}>
                <TextInput
                  label="Building Name"
                  value={leaseData?.apartment?.buildingId?.buildingName}
                  readOnly
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Building Hotline"
                  value={leaseData?.apartment?.buildingId?.telephone}
                  readOnly
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Textarea
                  label="Building Address"
                  value={leaseData?.apartment?.buildingId?.address}
                  readOnly
                />
              </Grid.Col>
            </Grid>
          </Fieldset>

          <Fieldset
            legend="Apartment Info."
            styles={fieldsetStyles}
            variant="filled"
          >
            <Flex align={"center"} gap={"xl"}>
              <Image
                maw={200}
                mah={200}
                radius={"lg"}
                src={showDefaultImage(leaseData?.apartment?.images ?? [])}
              />

              <Stack align="start" gap={5}>
                <Text fw={500}>{leaseData?.apartment?.identification}</Text>
                <Text fw={500}>{leaseData?.apartment?.class}</Text>
                <Text fw={500}>{leaseData?.apartment?.telephone}</Text>
              </Stack>
            </Flex>
          </Fieldset>

          <Fieldset
            legend="Rent Payments Info."
            styles={fieldsetStyles}
            variant="filled"
          >
            <ReceiptPaymentsTable rentPayments={leaseData?.rentSlots ?? []} />
          </Fieldset>
        </Stack>
      </Stack>
    </Stack>
  );
};
