import {
  ActionIcon,
  Button,
  Collapse,
  Flex,
  Group,
  rem,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { RiFilter3Fill, RiSearchLine } from "@remixicon/react";
import React, { useEffect } from "react";

type DataSearchProps = {
  placeholder: string;
  children?: React.ReactNode;
  nameOfSearchField: string;
  onSearchChange: (value: string) => void;
  form: UseFormReturnType<any, (values: any) => any>;
  applyFilters: (newFilters: Partial<any>) => void;
  resetFilters: () => void;
  isLoading: boolean;
  customRightSection?: React.ReactNode;
  elementSizes?: "xs" | "sm" | "md" | "lg" | "xl";
};

export const DataSearch = ({
  placeholder,
  children,
  nameOfSearchField,
  onSearchChange,
  form,
  applyFilters,
  resetFilters,
  isLoading,
  customRightSection,
  elementSizes,
}: DataSearchProps) => {
  const [opened, { toggle }] = useDisclosure(false);

  // Start : Search
  const [searchValue, setSearchValue] = useDebouncedState(
    form.values[nameOfSearchField] || "",
    200,
  );

  useEffect(() => {
    onSearchChange(searchValue);
  }, [searchValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearchValue(value);
    form.setFieldValue(nameOfSearchField, value);
  };
  // End : Search

  return (
    <Stack gap={"xs"} align="stretch" justify="flex-start" w={"100%"}>
      <Flex
        justify={"space-between"}
        align={"center"}
        gap={"xs"}
        bg={"#FFFFFF"}
        style={{
          borderRadius: rem(20),
          overflow: "hidden",
        }}
        pr={"sm"}
      >
        <TextInput
          flex={1}
          variant="unstyled"
          styles={{
            input: {
              color: "var(--mantine-color-darkBrown-6)",
              textAlign: "center",
            },
          }}
          radius={"xl"}
          size={elementSizes ?? "sm"}
          leftSection={
            <RiSearchLine color="var(--mantine-color-darkBrown-6)" size={20}/>
          }
          placeholder={placeholder}
          value={form.values[nameOfSearchField]}
          onChange={handleSearchChange}
        />

        {children ? (
          <Tooltip label={"Advanced Search"}>
            <ActionIcon
              size={elementSizes ?? "md"}
              color="blue.6"
              variant="transparent"
              onClick={toggle}
            >
              <RiFilter3Fill />
            </ActionIcon>
          </Tooltip>
        ) : (
          ""
        )}

        {customRightSection && customRightSection}
      </Flex>

      <Collapse in={opened}>
        <Stack
          bg={"#FFFFFF"}
          p={"xs"}
          align="stretch"
          gap="xs"
          style={{
            borderRadius: rem(20),
          }}
        >
          <Text
            fw={600}
            fz={elementSizes ?? "md"}
            ta={"center"}
            c={"blue.6"}
          >
            Advanced Search
          </Text>

          <form onSubmit={form.onSubmit(applyFilters)}>
            <Flex
              align={"end"}
              justify={"space-between"}
              gap={"sm"}
              wrap={"wrap"}
            >
              <Flex
                align={"end"}
                justify={"flex-start"}
                gap={"xs"}
                wrap={"wrap"}
              >
                {children ?? <></>}
              </Flex>
              <Group gap={rem(5)}>
                <Button
                  color="blue.6"
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
                  size={elementSizes ?? "sm"}
                >
                  Apply Filters
                </Button>
                <Button
                  variant="outline"
                  color="gray.7"
                  type="button"
                  onClick={resetFilters}
                  disabled={isLoading}
                  size={elementSizes ?? "sm"}
                >
                  Reset
                </Button>
              </Group>
            </Flex>
          </form>
        </Stack>
      </Collapse>
    </Stack>
  );
};
