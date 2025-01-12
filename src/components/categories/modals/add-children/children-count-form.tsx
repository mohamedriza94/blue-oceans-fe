import { Button, Flex, NumberInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { AddChildrenForm } from "./add-children-form";
import { TCategory } from "../../types/category";
import { useParentCategoryID } from "./store/use-current-parent-category";

type AddChildrenFormProps = {
  setIsChildrenSet: (value: boolean) => void;
  isChildrenSet: boolean;
  categoryId: TCategory["_id"];
};

export const ChildrenCountForm = ({
  setIsChildrenSet,
  isChildrenSet,
  categoryId,
}: AddChildrenFormProps) => {
  const { setParentCategoryID } = useParentCategoryID();

  useEffect(() => setParentCategoryID(categoryId ?? null), []);

  const max = 4;

  const [childrenCount, setChildrenCount] = useState<number>(1);

  const handleSetChildrenCount = (value: number | string) => {
    setChildrenCount(Number(value));
  };

  const handleSetChildren = () => {
    setIsChildrenSet(true);
  };

  return (
    <>
      {isChildrenSet ? (
        <AddChildrenForm childrenCount={childrenCount} />
      ) : (
        <Flex align={"end"} justify={"space-between"} gap={5}>
          <NumberInput
            flex={1}
            value={childrenCount}
            onChange={handleSetChildrenCount}
            max={max}
            clampBehavior="strict"
            description={`You can add up to ${max} children at a time`}
            min={1}
            label="How many children do you want to add?"
          />

          <Button onClick={handleSetChildren}>Go</Button>
        </Flex>
      )}
    </>
  );
};
