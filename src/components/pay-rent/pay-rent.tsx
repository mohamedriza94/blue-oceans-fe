import { TRent } from "../lease/hooks/use-read-rents-of-lease-api";
import { loadStripe } from "@stripe/stripe-js";
import { Elements as StripeElements } from "@stripe/react-stripe-js";
import { stripePublishableKey } from "@/shared/constants/general";
import { PaymentForm } from "./payment-form";
import { Flex, Stack, Text } from "@mantine/core";

export const PayRent = ({ rent }: { rent: TRent }) => {
  const stripePromise = loadStripe(stripePublishableKey);

  const options = { clientSecret: rent.clientSecret };

  return (
    <Stack align="stretch" gap={"xs"}>
      <Flex align={"center"} justify={"space-between"} gap={"xs"}>
        <Text c={"#5433FF"} fw={700} size="xl">
          Stripe
        </Text>
        <Text
          fw={600}
          c={"blue.5"}
          ta={"right"}
        >{`Amount: $${rent.amount}`}</Text>
      </Flex>

      <StripeElements stripe={stripePromise} options={options}>
        <PaymentForm rent={rent} />
      </StripeElements>
    </Stack>
  );
};
