import { Badge, Popover, TextInput } from "@mantine/core";

type AltTextProps = {
  idx: number;
  handleAltText: (idx: number, altText: string) => void;
  altTextValue: string;
};

export const AltText = ({ idx, handleAltText, altTextValue }: AltTextProps) => {
  return (
    <Popover
      width={200}
      position="bottom"
      withArrow
      shadow="md"
      arrowPosition="side"
    >
      <Popover.Target>
        <Badge
          title="Add Alt Text"
          size="xs"
          tt={"capitalize"}
          color="gray.6"
          component="button"
          type="button"
          radius="xs"
          style={{
            cursor: "pointer",
          }}
        >
          Alt
        </Badge>
      </Popover.Target>
      <Popover.Dropdown p={5}>
        <TextInput
        autoFocus
          size="xs"
          radius="sm"
          placeholder="Enter Alt text"
          value={altTextValue}
          onChange={(e) => handleAltText(idx, e.target.value)}
        />
      </Popover.Dropdown>
    </Popover>
  );
};
