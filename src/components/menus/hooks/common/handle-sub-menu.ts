import { UseFormReturnType } from "@mantine/form";

export type TAddSubmenuFn<T> = (
  form: UseFormReturnType<T>,
  path: string,
  initialValues: T,
  index?: number | null,
) => void;
export const addSubmenu: TAddSubmenuFn<any> = (
  form,
  path,
  initialValues,
  index = null,
) => {
  if (index == null) {
    form.insertListItem(path, initialValues);
  } else {
    form.insertListItem(`${path}.${index}.submenus`, initialValues);
  }
};

// ----------------------------------------------------------------

export type TRemoveSubmenuFn<T> = (
  form: UseFormReturnType<T>,
  path: string,
  index: number,
) => void;
export const removeSubmenu: TRemoveSubmenuFn<any> = (form, path, index) => {
  form.removeListItem(path, index);
};
