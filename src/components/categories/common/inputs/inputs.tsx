import { fieldsetStyles } from "@/components/common/form-fieldset-style";
import { CustomDropzone } from "@/shared/components/custom-dropzone";
import { CustomRichTextEditor } from "@/shared/components/custom-rich-text-editor";
import {
  Fieldset,
  Grid,
  Stack,
  Switch,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { ParentCategory } from "./parent-category";
import { CustomFile } from "@/shared/components/custom-dropzone/types";
import { UseFormReturnType } from "@mantine/form";
import { TCategory } from "../../types/category";
import { Dispatch, SetStateAction } from "react";

type CategoryInputsProps = {
  isPending: boolean;
  form: UseFormReturnType<TCategory, (values: TCategory) => TCategory>;
  files: CustomFile[];
  setFiles: Dispatch<SetStateAction<CustomFile[]>>;
  parentDisabled?: boolean;
  omitCategoryIDsFromParentList?: TCategory["_id"][];
};

export const CategoryInputs = ({
  files,
  form,
  isPending,
  setFiles,
  parentDisabled,
  omitCategoryIDsFromParentList = [],
}: CategoryInputsProps) => {
  return (
    <Stack gap={"xs"}>
      <Grid>
        <Grid.Col>
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

        <Grid.Col>
          <Switch
            size="xs"
            label="Active"
            disabled={isPending}
            {...form.getInputProps("isActive", { type: "checkbox" })}
          />
        </Grid.Col>

        <Grid.Col>
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

        <Grid.Col>
          <Fieldset legend="Images" styles={fieldsetStyles} variant="filled">
            <CustomDropzone
              files={files}
              setFiles={setFiles}
              isUploading={isPending}
            />
          </Fieldset>
        </Grid.Col>

        <ParentCategory
          form={form}
          isPending={isPending}
          parentDisabled={parentDisabled}
          omitCategoryIDsFromParentList={omitCategoryIDsFromParentList}
        />
      </Grid>
    </Stack>
  );
};
