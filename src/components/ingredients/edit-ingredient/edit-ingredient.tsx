import { Fieldset, rem, Stack } from "@mantine/core";
import { useEffect } from "react";
import { TIngredient } from "../types/ingredient";
import { useEditIngredientForm } from "../hooks/edit-ingredient/use-edit-ingredient-form";
import { BasicInfo } from "../create/inputs/basic-info";
import { NutritionalInfo } from "../create/inputs/nutritional-info";
import { SEO } from "../create/inputs/seo";
import { ActionButtons } from "../create/inputs/action-buttons";
import { CustomDropzone } from "@/shared/components/custom-dropzone";
import { fieldsetStyles } from "@/components/common/form-fieldset-style";

type EditIngredientProps = {
  ingredient: TIngredient;
  closeModal: () => void;
};

export const EditIngredient = ({
  ingredient,
  closeModal,
}: EditIngredientProps) => {
  const {
    form,
    isPending,
    handleSubmit,
    isSuccess,
    resetForm,
    allFiles,
    setAllFiles,
  } = useEditIngredientForm(ingredient);

  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess]);

  return (
    <Stack
      gap="xs"
      align="stretch"
      bg="#FFFFFF"
      style={{ borderRadius: rem(20) }}
      p="lg"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="xs">
          <Fieldset
            legend="Basic Info."
            styles={fieldsetStyles}
            variant="filled"
          >
            <BasicInfo form={form} isPending={isPending} />
          </Fieldset>

          <Fieldset legend="Images" styles={fieldsetStyles} variant="filled">
            <CustomDropzone
              files={allFiles}
              setFiles={setAllFiles}
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
