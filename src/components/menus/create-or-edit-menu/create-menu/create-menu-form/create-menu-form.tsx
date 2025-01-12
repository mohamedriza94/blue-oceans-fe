import { useGetStaffMemberAttributes } from "@/components/staff-members/hooks/use-get-staff-member-attributes";
import { useCreateMenuItemForm } from "../../../hooks/create-menu/use-create-menu-form";
import { MenuInputs } from "../../common/inputs";
import { Box, Divider, Flex, rem, Text } from "@mantine/core";
import { CreateMenuActionButtons } from "../../common/inputs/action-buttons";
import { SubMenus } from "../../common/sub-menus";

export const CreateMenuForm = () => {
  const { data: attributes } = useGetStaffMemberAttributes();
  const cmifh = useCreateMenuItemForm();

  return (
    <form onSubmit={cmifh.form.onSubmit(cmifh.handleSubmit)}>
      <Flex align={"center"} justify={"space-between"} gap={"xs"}>
        <Text c={"darkBrown.6"} fw={700} fz={"h2"}>
          Create Menu
        </Text>

        <CreateMenuActionButtons
          isPending={cmifh.isPending}
          form={cmifh.form}
        />
      </Flex>

      <MenuInputs
        {...cmifh}
        roles={attributes?.roles ?? []}
        paths={{
          label: "label",
          href: "href",
          allowedRoles: "allowedRoles",
          description: "description",
          displayPosition: "displayPosition",
          icon: "icon",
          isActive: "isActive",
        }}
      />

      {cmifh.form.values.submenus && cmifh.form.values.submenus?.length > 0 && (
        <SubMenus>
          {cmifh.form.values.submenus?.map((_, index) => (
            <Box
              bg={"#FFFFFF"}
              py={"sm"}
              px={"lg"}
              style={{ borderRadius: rem(20) }}
              key={index + "submenu-item"}
            >
              <Text c={"amaranthRed.5"} fw={700}>
                #{index + 1}
              </Text>
              <Divider w={100} my={5} color={"amaranthRed.5"} />

              <MenuInputs
                {...cmifh}
                roles={attributes?.roles ?? []}
                paths={{
                  label: `submenus.${index}.label`,
                  href: `submenus.${index}.href`,
                  allowedRoles: `submenus.${index}.allowedRoles`,
                  description: `submenus.${index}.description`,
                  displayPosition: `submenus.${index}.displayPosition`,
                  icon: `submenus.${index}.icon`,
                  isActive: `submenus.${index}.isActive`,
                }}
                index={index}
              />
            </Box>
          ))}
        </SubMenus>
      )}
    </form>
  );
};
