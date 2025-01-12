import { TIngredient } from "@/components/ingredients/types/ingredient";
import { Grid, TagsInput, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

type SEOProps = {
  form: UseFormReturnType<TIngredient, (values: TIngredient) => TIngredient>;
  isPending: boolean;
};

export const SEO = ({ form, isPending }: SEOProps) => {
  return (
    <Grid>
      <Grid.Col span={12}>
        <TextInput
          size="sm"
          placeholder="Enter the SEO title"
          label="Title"
          key={form.key("seo.title")}
          {...form.getInputProps("seo.title")}
          disabled={isPending}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <TagsInput
          size="sm"
          placeholder="Type a keyword and hit Enter"
          label="Keywords"
          key={form.key("seo.keywords")}
          {...form.getInputProps("seo.keywords")}
          disabled={isPending}
        />
      </Grid.Col>
    </Grid>
  );
};
