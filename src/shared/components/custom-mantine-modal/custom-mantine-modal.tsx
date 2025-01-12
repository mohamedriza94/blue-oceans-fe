import React, { forwardRef, useImperativeHandle } from "react";
import { Modal, ModalProps } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

type CustomMantineModalProps = {
  children: React.ReactNode;
  customTrigger?: React.ReactNode;
};

export const CustomMantineModal = forwardRef(({ children, customTrigger = <>

    </>, ...modalProps }: CustomMantineModalProps & Partial<ModalProps>, ref: React.Ref<{ open: () => void; close: () => void }>) => {
  const [opened, { open, close }] = useDisclosure(false);

  const {
    opened: userOpened,
    onClose: userOnClose,
    ...restModalProps
  } = modalProps;

  // Expose open and close methods to the parent
  useImperativeHandle(ref, () => ({ open, close }));

  const triggerWithHandler = React.cloneElement(
    customTrigger as React.ReactElement,
    { onClick: open },
  );

  return (
    <>
      {triggerWithHandler}
      <Modal
        opened={userOpened !== undefined ? userOpened : opened}
        onClose={userOnClose || close}
        {...restModalProps}
      >
        {children}
      </Modal>
    </>
  );
});
