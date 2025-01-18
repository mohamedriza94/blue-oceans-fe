import { ViewModal } from "../../view-modal/view-modal";

type TProps = {
  extensionRequestId: string;
};

export const TdActions = ({ extensionRequestId }: TProps) => {
  return (
    <>
      <ViewModal extensionRequestId={extensionRequestId} />.
    </>
  );
};
