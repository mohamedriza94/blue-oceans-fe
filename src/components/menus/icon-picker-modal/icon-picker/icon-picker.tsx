import {
  ActionIcon,
  Divider,
  ScrollAreaAutosize,
  SimpleGrid,
  Stack,
  TextInput,
  Tooltip,
} from "@mantine/core";
import * as Icons from "@remixicon/react";
import { RefObject, useState, useEffect, useMemo } from "react";
import { initialIconList } from "./initialIconsList";
import { getIconComponent } from "@/shared/utils/dynamic-render-remix-icons";
import { useDebouncedValue } from "@mantine/hooks";

type IconPickerProps = {
  setIcon: (selectedIcon: string) => void;
  iconPickerModalRef: RefObject<{ open: () => void; close: () => void }>;
};

const IconPicker = ({ setIcon, iconPickerModalRef }: IconPickerProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 200);
  const [displayIcons, setDisplayIcons] = useState<string[]>(initialIconList);

  const allIconsList = useMemo(
    () => Object.keys(Icons) as (keyof typeof Icons)[],
    [],
  );

  useEffect(() => {
    if (!debouncedSearchQuery.trim()) {
      setDisplayIcons(initialIconList);
    } else {
      const filteredIcons = allIconsList.filter((iconName) =>
        iconName.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
      );
      setDisplayIcons(filteredIcons);
    }
  }, [debouncedSearchQuery]);

  return (
    <Stack gap="xs" align="stretch">
      <TextInput
        placeholder="Search Icon"
        value={searchQuery}
        leftSection={<Icons.RiSearchLine />}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Divider />
      <ScrollAreaAutosize mah={300} type="auto">
        <SimpleGrid cols={8} spacing="md">
          {displayIcons.length > 0 ? (
            displayIcons.map((iconName) => (
              <Tooltip label={iconName} key={iconName} withArrow>
                <ActionIcon
                  size="md"
                  variant="subtle"
                  color="gray.8"
                  onClick={() => {
                    setIcon(iconName);
                    iconPickerModalRef.current?.close();
                  }}
                >
                  {getIconComponent(iconName)}
                </ActionIcon>
              </Tooltip>
            ))
          ) : (
            <p style={{ textAlign: "center", marginTop: "1rem" }}>
              No icons found
            </p>
          )}
        </SimpleGrid>
      </ScrollAreaAutosize>
    </Stack>
  );
};

export default IconPicker;
