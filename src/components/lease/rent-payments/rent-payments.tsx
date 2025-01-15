import { useEffect } from "react";
import { useRentsOfLease } from "../hooks/use-read-rents-of-lease-api";
import { Table } from "@mantine/core";
import { RentsOfLeaseTable } from "./table";

type TProps = {
  leaseId: string;
  closeModal: () => void;
};

export const RentPayments = ({ closeModal, leaseId }: TProps) => {
  const { isPending, data, isError } = useRentsOfLease(leaseId);
  const rentPayments = data?.data?.data ?? [];

  return (
    <RentsOfLeaseTable
      isLoading={isPending}
      isError={isError}
      rentPayments={rentPayments}
    />
  );
};
