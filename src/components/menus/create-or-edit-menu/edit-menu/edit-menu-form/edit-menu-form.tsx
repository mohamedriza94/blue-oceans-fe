import { useGetStaffMemberAttributes } from "@/components/staff-members/hooks/use-get-staff-member-attributes";
import { MenuInputs } from "../../common/inputs";
import { Box, Divider, Flex, rem, Text } from "@mantine/core";
import { CreateMenuActionButtons } from "../../common/inputs/action-buttons";
import { SubMenus } from "../../common/sub-menus";
import { useEditMenuItemForm } from "@/components/menus/hooks/edit-menu/use-edit-menu-form";
import { TMenuItem } from "@/components/menus/types/menu-item";

type EditMenuFormProps = {
  menu: TMenuItem;
  closeModal?: () => void;
};

export const EditMenuForm = ({ menu, closeModal }: EditMenuFormProps) => {
  const { data: attributes } = useGetStaffMemberAttributes();
  const emifh = useEditMenuItemForm({ menu, closeModal });

  return (
    <form onSubmit={emifh.form.onSubmit(emifh.handleSubmit)}>
      <Flex align={"center"} justify={"space-between"} gap={"xs"}>
        <Text c={"darkBrown.6"} fw={700} fz={"h2"}>
          Edit Menu
        </Text>

        <CreateMenuActionButtons
          isPending={emifh.isPending}
          form={emifh.form}
        />
      </Flex>

      <MenuInputs
        {...emifh}
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

      {emifh.form.values.submenus && emifh.form.values.submenus?.length > 0 && (
        <SubMenus>
          {emifh.form.values.submenus?.map((_, index) => (
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
                {...emifh}
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
