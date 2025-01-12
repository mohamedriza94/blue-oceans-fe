import { Drawer, DrawerProps } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

type CustomMantineDrawerProps = {
  children: React.ReactNode;
  customTrigger?: React.ReactNode;
};

export const CustomMantineDrawer = ({
  children,
  customTrigger = <></>,
  ...drawerProps
}: CustomMantineDrawerProps & Partial<DrawerProps>) => {
  const [opened, { open, close }] = useDisclosure(false);

  const {
    opened: userOpened,
    onClose: userOnClose,
    ...restDrawerProps
  } = drawerProps;

  const triggerWithHandler = React.cloneElement(
    customTrigger as React.ReactElement,
    { onClick: open },
  );

  return (
    <>
      {triggerWithHandler}
      <Drawer
        opened={userOpened !== undefined ? userOpened : opened}
        onClose={userOnClose || close}
        {...restDrawerProps}
      >
        {children}
      </Drawer>
    </>
  );
};
