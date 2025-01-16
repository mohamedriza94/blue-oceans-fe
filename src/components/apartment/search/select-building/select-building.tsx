import { useEffect } from "react";
import { Combobox, Flex, InputBase, Loader, useCombobox } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { useGetBuildings } from "@/components/building/hooks/use-read-buildings-api";
import { TBuilding } from "@/components/building/table";

type TProps = {
  setValue: (value: string | undefined) => void;
  value: string | undefined;
  disabled?: boolean;
};

export function SelectBuilding({ setValue, value, disabled }: TProps) {
  const { applyFilters, data, isPending: isSearching } = useGetBuildings();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [search, setSearch] = useDebouncedState("", 500);

  useEffect(() => {
    applyFilters({ limit: 1000, buildingName: search });
  }, [search]);

  const options =
    data?.data.data.buildings.map((item: TBuilding, idx: number) => (
      <Combobox.Option value={item?._id ?? ""} key={idx + "building"}>
        {item.buildingName}
      </Combobox.Option>
    )) ?? [];

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        const selectedBuilding = data?.data.data.buildings.find(
          (building: TBuilding) => building._id === val,
        );
        setValue(selectedBuilding?._id);
        setSearch(selectedBuilding?.buildingName || ""); // Show the selected name in the input
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          disabled={disabled}
          size="xs"
          flex={1}
          value={search} // Display search text or selected value
          rightSection={
            isSearching ? <Loader size={15} /> : <Combobox.Chevron />
          }
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value); // Update the search value
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            if (!value) setSearch(""); // Clear if no value selected
          }}
          label="Building"
          placeholder="Select a Building"
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
  );
}
