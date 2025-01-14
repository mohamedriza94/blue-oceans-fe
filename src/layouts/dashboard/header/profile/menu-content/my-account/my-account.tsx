import { Stack, Text } from "@mantine/core";
import { useGetMyAccountDetails } from "../../hooks/get-my-account-details-api";
import { MyAccountSkeleton } from "./my-account-skeleton";
import { MyAccountDetails } from "./my-account-details";
import { useEffect } from "react";

export const MyAccount = () => {
  const { data: myAccount, isLoading } = useGetMyAccountDetails();

  useEffect(()=>{console.log('myAccount', myAccount)},[myAccount])

  return (
    <Stack align="stretch" justify="flex-start" gap="xs">
      <Text c="darkBrown.6" fw={700} fz="h1" ta="center">
        My Account
      </Text>

      {isLoading ? (
        <MyAccountSkeleton />
      ) : (
        <>
          <MyAccountDetails myAccount={myAccount} />
        </>
      )}
    </Stack>
  );
};
