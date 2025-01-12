import { Button, Grid } from "@mantine/core";
import { RiAddLine } from "@remixicon/react";

export const CategoryChildren = () => {
  return (
    <Grid>
      <Grid.Col>
        <Button
          size="xs"
          variant="outline"
          radius={"md"}
          leftSection={<RiAddLine size={15} />}
        >
          Add Child
        </Button>
      </Grid.Col>
    </Grid>
  );
};
