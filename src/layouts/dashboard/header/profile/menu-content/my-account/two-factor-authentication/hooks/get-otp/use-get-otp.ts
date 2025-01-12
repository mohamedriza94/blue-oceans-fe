import { axiosPrivate } from "@/shared/lib/axios/private";
import { useStaffMemberStore } from "@/shared/stores/staff-member-store";
import { ShowErrors } from "@/shared/utils/show-errors";
import { useInterval } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const getOtpPostFn = async () => {
  const response = await axiosPrivate.post(
    "/authentication/request-otp-after-authenticated",
    {},
  );
  return response.data;
};

const useGetOtpApi = (onSuccessCallback: () => void) => {
  const mutation = useMutation({
    mutationFn: getOtpPostFn,
    retry: 1,
    onSuccess: () => {
      notifications.show({
        color: "green.4",
        message: "OTP Sent!",
        position: "top-center",
        withCloseButton: false,
        withBorder: false,
      });
      onSuccessCallback();
    },
    onError: (error: any) => {
      ShowErrors(error, "react-query-axios", { position: "top-center" });
    },
  });

  return mutation;
};

export const useGetOtpForm = () => {
  const { staffMember } = useStaffMemberStore();
  const [countdown, setCountdown] = useState(0);

  // Start : countdown
  const interval = useInterval(() => {
    setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
  }, 1000);

  const startCountdown = () => {
    setCountdown(30);
    interval.start();
  };
  // End : countdown

  const getOtpResult = useGetOtpApi(startCountdown);

  const handleSendOtp = () => {
    if (countdown === 0) {
      getOtpResult.mutate();
    }
  };

  // Automatically send OTP when modal is opened
  useEffect(() => {
    handleSendOtp();
  }, []);

  return {
    handleSendOtp,
    countdown,
    email: staffMember?.email,
    ...getOtpResult,
  };
};
