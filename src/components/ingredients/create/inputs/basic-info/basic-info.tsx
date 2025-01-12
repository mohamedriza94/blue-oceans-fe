import { TIngredient } from "@/components/ingredients/types/ingredient";
import { CustomRichTextEditor } from "@/shared/components/custom-rich-text-editor";
import { Grid, Stack, Switch, Text, Textarea, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

type BasicInfoProps = {
  form: UseFormReturnType<TIngredient, (values: TIngredient) => TIngredient>;
  isPending: boolean;
};

export const BasicInfo = ({ form, isPending }: BasicInfoProps) => {
  return (
    <Grid>
      <Grid.Col span={12}>
        <TextInput
          size="sm"
          placeholder="Enter the name"
          label="Name"
          withAsterisk
          disabled={isPending}
          key={form.key("name")}
          {...form.getInputProps("name")}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <Switch
          size="xs"
          label="Active"
          disabled={isPending}
          {...form.getInputProps("isActive", { type: "checkbox" })}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <Textarea
          size="sm"
          placeholder="Enter the short description"
          label="Short Description"
          withAsterisk
          disabled={isPending}
          key={form.key("shortDescription")}
          {...form.getInputProps("shortDescription")}
        />
      </Grid.Col>
      <Grid.Col>
        <Stack gap={0}>
          <Text size="sm" fw={500}>
            Description{" "}
            <Text c={"red"} component="span">
              *
            </Text>
          </Text>
          <CustomRichTextEditor
            placeholder="Enter the description"
            value={form.values.description}
            onChange={(value) => form.setFieldValue("description", value)}
          />
        </Stack>
      </Grid.Col>
    </Grid>
  );
};
