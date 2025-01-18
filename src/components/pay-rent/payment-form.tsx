import { apiVOneBaseURL } from "@/shared/constants/general";
import { Button, Loader, Stack } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { TRent } from "../lease/hooks/use-read-rents-of-lease-api";

export const PaymentForm = ({ rent }: { rent: TRent }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(true);
  const handleReady = () => {
    setIsLoading(false);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      showNotification({
        message: "Stripe hasn't loaded",
        color: "amaranthRed.5",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${apiVOneBaseURL}/lease/pay-rent-stripe-callback/${rent._id}`,
        },
      });

      if (!response) {
        showNotification({
          message: "Failure. Try again later",
          color: "amaranthRed.5",
        });

        setIsSubmitting(false);
        return;
      }

      if (response.error) {
        if (
          response.error.payment_intent &&
          response.error.payment_intent.status === "succeeded"
        ) {
          showNotification({
            message: "This rent has already been paid",
            color: "blue.5",
          });

          setIsSubmitting(false);
          return;
        }

        showNotification({
          message: "Payment failed",
          color: "amaranthRed.5",
        });

        setIsSubmitting(false);
        return;
      }
    } catch (error) {
      console.error("Error during payment confirmation:", error);

      showNotification({
        message: "Failure. Try again later",
        color: "amaranthRed.5",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack align="stretch" gap={"xs"}>
        <PaymentElement onReady={handleReady} />

        <Button
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting || isLoading}
        >
          Pay
        </Button>
      </Stack>
    </form>
  );
};
