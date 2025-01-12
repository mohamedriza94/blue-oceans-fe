import { Stack, Button, Flex, ButtonProps } from "@mantine/core";
import { getBGColor } from "./get-bg-color-fn";
import { DefaultChildren } from "./default-children";

export type AlertModalProps = {
  type: "success" | "error" | "warning" | "info";
  children?: React.ReactNode;
  showDefaultChildren?: boolean;
  defaultChildrenTexts?: {
    headerText?: string;
    subtext?: string;
  };
  confirmButtonClickAction?: () => void;
  confirmButtonColor?: string;
  confirmButtonText?: string;
  showConfirmButton?: boolean;
  confirmButtonProps?: ButtonProps;
  closeButtonProps?: ButtonProps;
  closeButtonText?: string;
  showCloseButton?: boolean;
  closeModal?: () => void;
  isLoading?: boolean;
};

// ================================================================

export const AlertModal = ({
  type,
  children,
  showDefaultChildren = true,
  defaultChildrenTexts,
  confirmButtonClickAction,
  confirmButtonColor,
  confirmButtonText = "Ok",
  showConfirmButton = true,
  closeButtonText = "Close",
  confirmButtonProps,
  closeButtonProps,
  showCloseButton = true,
  closeModal,
  isLoading = false,
}: AlertModalProps) => {
  return (
    <Stack bg={"#FFFFFF"} align={"center"} justify={"center"} gap={"sm"}>
      {showDefaultChildren ? (
        <DefaultChildren
          type={type}
          isLoading={isLoading}
          headerText={defaultChildrenTexts?.headerText}
          subtext={defaultChildrenTexts?.subtext}
        />
      ) : (
        ""
      )}
      {children}

      <Flex justify={"space-around"} gap={"sm"}>
        {showConfirmButton && (
          <Button
            variant="filled"
            color={confirmButtonColor ?? getBGColor(type)}
            onClick={() => {
              if (confirmButtonClickAction) {
                confirmButtonClickAction();
              }
              closeModal && closeModal();
            }}
            {...confirmButtonProps}
          >
            {confirmButtonText}
          </Button>
        )}
        {showCloseButton && (
          <Button
            onClick={closeModal}
            variant="outline"
            color="gray"
            {...closeButtonProps}
          >
            {closeButtonText}
          </Button>
        )}
      </Flex>
    </Stack>
  );
};
