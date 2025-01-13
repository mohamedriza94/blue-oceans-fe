import { Button, Group } from "@mantine/core";

type ActionButtonsProps = {
  isPending: boolean;
  resetFormFn: () => void;
};

export const ActionButtons = ({
  resetFormFn,
  isPending,
}: ActionButtonsProps) => {
  return (
    <Group justify="flex-end" grow>
      <Button
        type="button"
        variant="default"
        size="sm"
        disabled={isPending}
        onClick={resetFormFn}
      >
        Clear
      </Button>
      <Button
        type="submit"
        variant="filled"
        size="sm"
        disabled={isPending}
        loading={isPending}
      >
        Submit
      </Button>
    </Group>
  );
};
