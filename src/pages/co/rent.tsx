import { RentComponent } from "@/components/co/rent/rent";
import { protectedPaths } from "@/shared/constants/paths";
import useBreadcrumbStore from "@/shared/stores/breadcrumb-store";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAlertModal } from "@/shared/components/alert-modal/use-alert-modal";

export default function Rent() {
  const { setBreadcrumbs } = useBreadcrumbStore();
  const router = useRouter();
  const showAlert = useAlertModal();

  useEffect(() => {
    setBreadcrumbs([
      {
        label: "Rent",
        href: protectedPaths.co_rent.path,
      },
    ]);
  }, []);

  useEffect(() => {
    const confirmationStatus = router.query["rent-payment-confirmation"];
    if (confirmationStatus === "success") {
      showAlert({
        type: "success",
        defaultChildrenTexts: {
          headerText:
            "Payment Successful. Receipt has been mailed to you. Thank you",
        },
        showCloseButton: false,
      });
    } else if (confirmationStatus === "failed") {
      showAlert({
        type: "error",
        defaultChildrenTexts: {
          headerText: "Payment failed.",
        },
        showCloseButton: false,
      });
    }
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Rent</title>
      </Head>
      <RentComponent />
    </>
  );
}
