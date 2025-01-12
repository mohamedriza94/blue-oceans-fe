import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { Button, Flex, Grid, MultiSelect, Stack, Text } from "@mantine/core";
import { RefObject, useState } from "react";
import { TMenuItem } from "./types/menu-item";
import { useEditMenuApi } from "./hooks/edit-menu/use-edit-menu-api";
import { useGetStaffMemberAttributes } from "../staff-members/hooks/use-get-staff-member-attributes";
import { notifications } from "@mantine/notifications";

type ManageAccessProps = {
  menuItem: TMenuItem;
  manageAccessModalRef: RefObject<{ open: () => void; close: () => void }>;
};

export const ManageAccess = ({
  menuItem,
  manageAccessModalRef,
}: ManageAccessProps) => {
  const handleCloseModal = () => {
    manageAccessModalRef.current?.close();
  };

  const { data: attributes } = useGetStaffMemberAttributes();
  const { mutate, isPending } = useEditMenuApi();

  const [selectedRoles, setSelectedRoles] = useState<TMenuItem["allowedRoles"]>(
    menuItem.allowedRoles || [],
  );
  const [error, setError] = useState("");

  const handleSaveClick = () => {
    if (selectedRoles?.length == 0) {
      setError("At least one role needs to be allowed");
      return;
    }

    mutate(
      {
        menuId: menuItem._id,
        data: {
          allowedRoles: selectedRoles?.length
            ? selectedRoles
            : menuItem.allowedRoles,
        },
      },
      {
        onSuccess: () => {
          notifications.show({
            position: "top-center",
            message: "Access Updated",
            color: "green.4",
          });

          setError("");
          handleCloseModal();
        },
      },
    );
  };

  return (
    <CustomMantineModal
      ref={manageAccessModalRef}
      centered
      size="sm"
      withCloseButton={false}
    >
      <Stack gap="md" align="start">
        <Text fw={700} fz="lg">
          Manage Access
        </Text>

        <Grid>
          <Grid.Col span={12}>
            <MultiSelect
              size="sm"
              placeholder="Who can access this menu?"
              label="Allowed Roles"
              withAsterisk
              error={error}
              value={selectedRoles}
              onChange={setSelectedRoles}
              data={
                attributes?.roles.map((role) => ({
                  value: role,
                  label: role.charAt(0).toUpperCase() + role.slice(1),
                })) ?? []
              }
              disabled={isPending}
            />
          </Grid.Col>
        </Grid>

        <Flex align="center" justify="space-between" gap="xs" mt="md">
          <Button
            onClick={handleSaveClick}
            size="xs"
            variant="filled"
            loading={isPending}
            w={100}
            disabled={isPending}
          >
            Save
          </Button>
          <Button
            onClick={handleCloseModal}
            size="xs"
            variant="default"
            disabled={isPending}
          >
            Cancel
          </Button>
        </Flex>
      </Stack>
    </CustomMantineModal>
  );
};
