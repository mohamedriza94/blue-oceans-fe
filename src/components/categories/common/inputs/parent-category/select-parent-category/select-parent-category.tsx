import { useEffect } from "react";
import {
  ActionIcon,
  Combobox,
  Flex,
  InputBase,
  Loader,
  useCombobox,
} from "@mantine/core";
import { useGetCategories } from "@/components/categories/hooks/use-get-categories";
import { useDebouncedState } from "@mantine/hooks";
import { RiCloseLine } from "@remixicon/react";
import { TCategory } from "@/components/categories/types/category";

type SelectParentCategoryProps = {
  setValue: (value: string | undefined) => void;
  value: string | undefined;
  disabled?: boolean;
  omitCategoryIDsFromParentList?: TCategory["_id"][];
};

export function SelectParentCategory({
  setValue,
  value,
  disabled,
  omitCategoryIDsFromParentList = [],
}: SelectParentCategoryProps) {
  const { applyFilters, data, isPending: isSearching } = useGetCategories();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [search, setSearch] = useDebouncedState("", 500);

  useEffect(() => {
    applyFilters({ limit: 100, name: search });
  }, [search]);

  const options =
    data?.data.data.categories
      .filter((item) => !omitCategoryIDsFromParentList.includes(item._id))
      .map((item, idx) => (
        <Combobox.Option value={item?._id ?? ""} key={idx + "category"}>
          {item.name}
        </Combobox.Option>
      )) ?? [];

  return (
    <Flex align={"center"} gap={"xs"}>
      <Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(val) => {
          setValue(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            disabled={disabled}
            flex={1}
            rightSection={
              isSearching ? <Loader size={18} /> : <Combobox.Chevron />
            }
            onChange={(event) => {
              combobox.openDropdown();
              combobox.updateSelectedOptionIndex();
              setSearch(event.currentTarget.value);
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => {
              combobox.closeDropdown();
              setSearch("");
            }}
            placeholder="Search or Select a Category"
            rightSectionPointerEvents="none"
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {isSearching ? (
              <Combobox.Empty>Searching...</Combobox.Empty>
            ) : options.length > 0 ? (
              options
            ) : (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>

      {value && (
        <ActionIcon
          variant="light"
          size="lg"
          onClick={() => {
            setValue(undefined);
          }}
          disabled={disabled}
        >
          <RiCloseLine />
        </ActionIcon>
      )}
    </Flex>
  );
}
