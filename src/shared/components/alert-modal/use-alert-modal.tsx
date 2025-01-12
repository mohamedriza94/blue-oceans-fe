import { useCallback } from "react";
import { modals } from "@mantine/modals";
import { AlertModal, AlertModalProps } from "./modal";

export const useAlertModal = () => {
  const openAlertModal = useCallback(
    ({
      type,
      children,
      showDefaultChildren = true,
      defaultChildrenTexts,
      confirmButtonClickAction,
      confirmButtonColor,
      confirmButtonText,
      confirmButtonProps,
      closeButtonProps,
      showConfirmButton = true,
      closeButtonText,
      showCloseButton = true,
      isLoading = false,
    }: AlertModalProps) => {
      const modalId = modals.open({
        children: (
          // ================================================================

          <AlertModal
            type={type}
            showDefaultChildren={showDefaultChildren}
            defaultChildrenTexts={defaultChildrenTexts}
            confirmButtonClickAction={confirmButtonClickAction}
            confirmButtonColor={confirmButtonColor}
            confirmButtonText={confirmButtonText}
            confirmButtonProps={confirmButtonProps}
            closeButtonProps={closeButtonProps}
            showConfirmButton={showConfirmButton}
            showCloseButton={showCloseButton}
            closeButtonText={closeButtonText}
            closeModal={() => modals.close(modalId)}
            isLoading={isLoading}
          >
            {children}
          </AlertModal>

          // ================================================================
        ),
        centered: true,
        withCloseButton: false,
        onClose: () => {},
        overlayProps: {
          style: {
            background: "rgba(0, 0, 0, 0)",
            backdropFilter: "blur(40px)",
          },
        },
        transitionProps: { transition: "rotate-left" },
      });
    },
    [],
  );

  return openAlertModal;
};
