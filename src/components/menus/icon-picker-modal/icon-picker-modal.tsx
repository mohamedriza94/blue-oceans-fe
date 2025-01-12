import { CustomMantineModal } from "@/shared/components/custom-mantine-modal";
import { Skeleton, SimpleGrid } from "@mantine/core";
import { lazy, Suspense, RefObject, SetStateAction, Dispatch, memo } from "react";

type IconPickerModalProps = {
  iconPickerModalRef: RefObject<{ open: () => void; close: () => void }>;
  setIcon: (selectedIcon: string) => void;
};

const LazyIconPicker = lazy(() => import("./icon-picker/icon-picker"));

const IconPickerSkeleton = () => (
  <SimpleGrid cols={6} spacing="xs">
    {Array.from({ length: 48 }, (_, index) => (
      <Skeleton key={index} height={40} width={40} radius="md" />
    ))}
  </SimpleGrid>
);

const IconPickerModal = ({
  iconPickerModalRef,
  setIcon,
}: IconPickerModalProps) => {
  return (
    <CustomMantineModal
      ref={iconPickerModalRef}
      centered
      size={"lg"}
      title={"Pick Your Remix Icons"}
      styles={{
        title: {
          fontWeight: 600,
        },
      }}
    >
      <Suspense fallback={<IconPickerSkeleton />}>
        <LazyIconPicker
          setIcon={setIcon}
          iconPickerModalRef={iconPickerModalRef}
        />
      </Suspense>
    </CustomMantineModal>
  );
};

export default memo(IconPickerModal);
