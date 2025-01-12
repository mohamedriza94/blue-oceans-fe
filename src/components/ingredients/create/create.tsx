import { CustomDropzone } from "@/shared/components/custom-dropzone";
import { Fieldset, rem, Stack, Text } from "@mantine/core";
import { SEO } from "./inputs/seo";
import { NutritionalInfo } from "./inputs/nutritional-info";
import { BasicInfo } from "./inputs/basic-info";
import { ActionButtons } from "./inputs/action-buttons";
import { useAddIngredientForm } from "../hooks/add-ingredient/use-add-ingredient-form";

export const CreateIngredient = () => {
  const { form, isPending, handleSubmit, files, setFiles, resetForm } =
    useAddIngredientForm();

  const fieldsetStyles = {
    legend: {
      fontSize: rem(18),
      color: "var(--mantine-color-gray-6)",
      fontWeight: 500,
    },
  };

  return (
    <Stack
      gap={"xs"}
      align="stretch"
      bg={"#FFFFFF"}
      style={{ borderRadius: rem(20) }}
      p={"lg"}
    >
      <Text c={"darkBrown.6"} fw={700} fz={"h2"}>
        Create Ingredient
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap={"xs"}>
          <Fieldset
            legend="Basic Info."
            styles={fieldsetStyles}
            variant="filled"
          >
            <BasicInfo form={form} isPending={isPending} />
          </Fieldset>

          <Fieldset legend="Images" styles={fieldsetStyles} variant="filled">
            <CustomDropzone
              files={files}
              setFiles={setFiles}
              isUploading={isPending}
            />
          </Fieldset>

          <Fieldset
            legend="Nutritional Info."
            styles={fieldsetStyles}
            variant="filled"
          >
            <NutritionalInfo form={form} isPending={isPending} />
          </Fieldset>

          <Fieldset legend="SEO" styles={fieldsetStyles} variant="filled">
            <SEO form={form} isPending={isPending} />
          </Fieldset>

          <ActionButtons
            isPending={isPending}
            resetFormFn={() => resetForm()}
          />
        </Stack>
      </form>
    </Stack>
  );
};
